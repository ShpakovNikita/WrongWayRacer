import {
  GameFinishedSocketPayload,
  PlayerExplodedSocketPayload,
  UserProfile,
  WrongWayRacerSocketEventType,
  CarsUpdatedSocketPayload,
  TimerUpdatedSocketPayload,
  PlayersUpdatedSocketPayload
} from '@splash/types';
import { Server, Socket } from 'socket.io';
import { WrongWayRacerGameLogic, WrongWayRacerGameLogicConfig } from './game-logic/game-logic';
import { GameFinishedPayload, PlayerDeathPayload } from './game-logic/game-logic.events';
import GameArena from '../arena/arena';

type GameUser = UserProfile & {
  deathTime?: number;
  socket: Socket;
};

export class WrongWayRacerArenaError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongWayRacerArenaError';
  }
}

type ArenaShutdownCallback = (arena: WrongWayRacerArena, users: UserProfile[]) => void;

export class WrongWayRacerArena extends GameArena {
  private readonly _activeUsers: GameUser[];
  private readonly _io: Server;
  private readonly _gameLogic: WrongWayRacerGameLogic;

  private _lastUpdate: number;
  private _loopInterval: NodeJS.Timer;

  private readonly _onArenaShutdown: ArenaShutdownCallback;

  constructor(
    arenaId: string,
    io: Server,
    config: WrongWayRacerGameLogicConfig,
    onArenaShutdown: ArenaShutdownCallback
  ) {
    super(arenaId);

    this._io = io;
    this._gameLogic = new WrongWayRacerGameLogic(config);
    this._lastUpdate = Date.now();
    this._onArenaShutdown = onArenaShutdown;
  }

  public connectUser = (connectingUser: UserProfile, socket: Socket): void => {
    if (this._activeUsers.filter((user) => user.username === connectingUser.username)) {
      throw new WrongWayRacerArenaError(
        `Trying to connect already connected user ${JSON.stringify(connectingUser)}`
      );
    }

    this._activeUsers.push({ ...connectingUser, socket });
    this._gameLogic.addPlayer(connectingUser.id);
    socket.join(this.arenaId);
  };

  public disconnectUser = (disconnectingUser: UserProfile): void => {
    const activeUserIndex = this._activeUsers.findIndex(
      (user) => user.username === disconnectingUser.username
    );
    if (activeUserIndex < 0) {
      throw new WrongWayRacerArenaError(
        `Trying to disconnect not connected user ${JSON.stringify(disconnectingUser)}`
      );
    }

    const socket = this._activeUsers[activeUserIndex].socket;
    this._activeUsers.splice(activeUserIndex, 1);
    socket.leave(this.arenaId);
  };

  public startGame = () => {
    this._gameLogic.eventEmitter.addListener('playerDeath', this.onPlayerDeath);
    this._gameLogic.eventEmitter.addListener('gameFinished', this.onGameFinished);

    this._gameLogic.startGame();

    this._lastUpdate = Date.now();
    this._loopInterval = setInterval(this.gameLoop, 1000 / 60);
  };

  private shutdownArena = () => {
    clearInterval(this._loopInterval);
    this._onArenaShutdown(this, this._activeUsers);
  };

  /** MARK: Client to Server events */
  public onLeftPressed = (playerId: string) => {
    this._gameLogic.movePlayerLeft(playerId);
  };

  public onRightPressed = (playerId: string) => {
    this._gameLogic.movePlayerRight(playerId);
  };

  /** MARK: Server to Client events */
  public updateTimer = () => {
    const socketPayload: TimerUpdatedSocketPayload = { gameTime: this._gameLogic.globalTime };
    this._io.in(this.arenaId).emit(WrongWayRacerSocketEventType.timerUpdated, socketPayload);
  };

  public updateCarsPositions = () => {
    const socketPayload: CarsUpdatedSocketPayload = { cars: this._gameLogic.cars };
    this._io.in(this.arenaId).emit(WrongWayRacerSocketEventType.carsUpdated, socketPayload);
  };

  public updatePlayersPositions = () => {
    const socketPayload: PlayersUpdatedSocketPayload = { players: this._gameLogic.players };
    this._io.in(this.arenaId).emit(WrongWayRacerSocketEventType.carsUpdated, socketPayload);
  };

  private onGameFinished = ({ winnerPlayerId, finishTime }: GameFinishedPayload) => {
    const socketPayload: GameFinishedSocketPayload = {
      winnerId: winnerPlayerId,
      gameFinishedTime: finishTime
    };
    this._io.in(this.arenaId).emit(WrongWayRacerSocketEventType.gameFinished, socketPayload);

    this.shutdownArena();
  };

  private onPlayerDeath = ({ playerId, road }: PlayerDeathPayload) => {
    const player = this._activeUsers.filter((user) => user.id === playerId).at(0);
    if (player) {
      player.deathTime = this._gameLogic.globalTime;
    }

    const socketPayload: PlayerExplodedSocketPayload = { playerId, road };
    this._io.in(this.arenaId).emit(WrongWayRacerSocketEventType.playerExploded, socketPayload);
  };

  /** MARK: game loop */
  private gameLoop = () => {
    const now = Date.now();
    const dt = now - this._lastUpdate;
    this._lastUpdate = now;

    this._gameLogic.gameLoop(dt);
  };
}
