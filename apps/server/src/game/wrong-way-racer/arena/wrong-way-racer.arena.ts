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
import GameArena from '../../arena/arena';
import { ILogManager } from '@splash/logger';
import { ArenaUser } from '../../arena';
import { TypedEmitter } from 'tiny-typed-emitter';
import { WrongWayRacerArenaEvents } from './wrong-way-racer.events';
import {
  GameFinishedPayload,
  PlayerDeathPayload,
  WrongWayRacerGameLogic,
  WrongWayRacerGameLogicConfig
} from '@splash/wrong-way-racer';

type GameUser = ArenaUser & {
  deathTime?: number;
};

export class WrongWayRacerArenaError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongWayRacerArenaError';
  }
}

export class WrongWayRacerArena extends GameArena {
  private readonly _activeUsers: GameUser[] = [];
  private readonly _io: Server;
  private readonly _gameLogic: WrongWayRacerGameLogic;

  private _lastUpdate: number;
  private _loopInterval: NodeJS.Timer;

  private readonly _eventEmitter: TypedEmitter<WrongWayRacerArenaEvents>;

  public get eventEmitter(): TypedEmitter<WrongWayRacerArenaEvents> {
    return this._eventEmitter;
  }

  constructor(arenaId: string, io: Server, config: WrongWayRacerGameLogicConfig, logger?: ILogManager) {
    super(arenaId, logger?.child('WrongWayRacer.arena'));

    this._io = io;
    this._gameLogic = new WrongWayRacerGameLogic(config);
    this._lastUpdate = Date.now();
    this._eventEmitter = new TypedEmitter<WrongWayRacerArenaEvents>();
  }

  public startGame = () => {
    this._gameLogic.eventEmitter.addListener('playerDeath', this.onPlayerDeath);
    this._gameLogic.eventEmitter.addListener('gameFinished', this.onGameFinished);

    this._gameLogic.startGame();

    this._lastUpdate = Date.now();
    this._loopInterval = setInterval(this.gameLoop, 1000 / 60);

    this._logger?.info(`Game started for arena with id ${this.arenaId}...`);
  };

  /** MARK: Client to Server events */
  public onLeftPressed = (playerId: string) => {
    this._gameLogic.movePlayerLeft(playerId);
    this.updatePlayersPositions();
  };

  public onRightPressed = (playerId: string) => {
    this._gameLogic.movePlayerRight(playerId);
    this.updatePlayersPositions();
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
    this._io.in(this.arenaId).emit(WrongWayRacerSocketEventType.playersUpdated, socketPayload);
  };

  private onGameFinished = ({ winnerPlayerId, finishTime }: GameFinishedPayload) => {
    this._logger?.debug(`onGameFinished called with winner id ${winnerPlayerId} and time ${finishTime}`);

    const socketPayload: GameFinishedSocketPayload = {
      winnerId: winnerPlayerId,
      gameFinishedTime: finishTime
    };
    this._io.in(this.arenaId).emit(WrongWayRacerSocketEventType.gameFinished, socketPayload);

    this.eventEmitter.emit('gameFinished');
  };

  private onPlayerDeath = ({ playerId, road }: PlayerDeathPayload) => {
    this._logger?.debug(`Player with id ${playerId} exploded`);

    const player = this._activeUsers.filter((user) => user.id === playerId).at(0);
    if (player) {
      player.deathTime = this._gameLogic.globalTime;
    }

    const socketPayload: PlayerExplodedSocketPayload = { playerId, road };
    this._io.in(this.arenaId).emit(WrongWayRacerSocketEventType.playerExploded, socketPayload);
  };

  /** MARK: Game loop */
  private gameLoop = () => {
    const now = Date.now();
    const dt = now - this._lastUpdate;
    this._lastUpdate = now;

    this._logger?.debug(`Running game loop for arena ${this.arenaId} with dt ${dt} ms`);
    this._gameLogic.gameLoop(dt / 1000);

    this.updateTimer();
    this.updateCarsPositions();
  };

  /** MARK: Overrides */
  protected onUserConnected = (connectingUser: UserProfile, socket: Socket): void => {
    super.onUserConnected(connectingUser, socket);

    this._logger?.debug(`onUserConnected ${JSON.stringify(connectingUser)}...`);

    this._gameLogic.addPlayer(connectingUser.id);
  };

  protected onShutdownBegin() {
    super.onShutdownBegin();

    this._logger?.info(`onShutdownBegin on arena with id ${this.arenaId}...`);

    clearInterval(this._loopInterval);
  }
}
