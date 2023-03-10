import { SocketHandler, SocketListener } from '../interface';
import { Socket, Server } from 'socket.io';
import { LobbyEventType, CallbackStatus, StartWrongWayRacerPayload } from '@splash/types';
import { v4 as uuidv4 } from 'uuid';
import { WrongWayRacerArena } from '../wrong-way-racer/arena/wrong-way-racer.arena';
import { ILogManager } from '@splash/logger';
import { GameServer } from '../server';
import { getWrongWayRacerConfig, WrongWayRacerGameLogicConfig } from '@splash/wrong-way-racer';

const createWrongWayRacerArena = (
  io: Server,
  socket: Socket,
  gameServer: GameServer,
  config: WrongWayRacerGameLogicConfig,
  logger?: ILogManager
): WrongWayRacerArena => {
  const arenaId = `wrongWayRacer:${uuidv4()}`;

  const wrongWayRacerArena = new WrongWayRacerArena(arenaId, io, config, logger);

  gameServer.addGameArena(wrongWayRacerArena);

  wrongWayRacerArena.eventEmitter.addListener('gameFinished', () => {
    setImmediate(() => {
      logger?.debug(`gameFinished callback called for arena ${arenaId}`);
      removeWrongWayRacerArena(gameServer, wrongWayRacerArena);

      socket.emit(LobbyEventType.leavedArena, {});
    });
  });

  return wrongWayRacerArena;
};

const removeWrongWayRacerArena = (gameServer: GameServer, arena: WrongWayRacerArena) => {
  arena.shutdown();
  gameServer.removeGameArenaById(arena.arenaId);
};

const startWrongWayRacer = (
  io: Server,
  socket: Socket,
  gameServer: GameServer,
  logger?: ILogManager
): SocketListener => {
  // TODO: It's better to start another small server instance for different arenas
  return ({ gameSpeed }: StartWrongWayRacerPayload, callback) => {
    let user = gameServer.getUserById(socket.id);
    if (!user) {
      user = {
        username: `guest_${socket.id}`,
        id: socket.id
      };
      gameServer.addUser(user);
    }

    const arenaConfig = getWrongWayRacerConfig(gameSpeed, true);

    const wrongWayRacerArena = createWrongWayRacerArena(io, socket, gameServer, arenaConfig, logger);

    wrongWayRacerArena.connectUser(user, socket);
    socket.emit(LobbyEventType.enteredArena, {});

    wrongWayRacerArena.startGame();

    if (callback) {
      callback({ status: CallbackStatus.ok });
    }
  };
};

const registerLobbyHandlers: SocketHandler = (io, socket, gameServer: GameServer, logger?: ILogManager) => {
  // socket.on(LobbyEventType.createUser, createUser(io, socket, gameServer, logger));
  socket.on(LobbyEventType.startWrongWayRacer, startWrongWayRacer(io, socket, gameServer, logger));
};

export default registerLobbyHandlers;
