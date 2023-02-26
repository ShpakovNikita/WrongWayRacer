import { SocketHandler, SocketListener } from '../interface';
import { Socket, Server } from 'socket.io';
import { WrongWayRacerSocketEventType } from '@splash/types';
import { GameServer } from '../server';
import { ILogManager } from '@splash/logger';

const leftPressed = (
  io: Server,
  socket: Socket,
  gameServer: GameServer,
  logger?: ILogManager
): SocketListener => {
  return () => {
    const arena = gameServer.getConnectedArenaByUserId(socket.id);
    arena?.onLeftPressed(socket.id);
  };
};

const rightPressed = (
  io: Server,
  socket: Socket,
  gameServer: GameServer,
  logger?: ILogManager
): SocketListener => {
  return async () => {
    const arena = gameServer.getConnectedArenaByUserId(socket.id);
    arena?.onRightPressed(socket.id);
  };
};

const registerWrongWayHandlers: SocketHandler = (
  io,
  socket,
  gameServer: GameServer,
  logger?: ILogManager
) => {
  socket.on(WrongWayRacerSocketEventType.leftPressed, leftPressed(io, socket, gameServer, logger));
  socket.on(WrongWayRacerSocketEventType.rightPressed, rightPressed(io, socket, gameServer, logger));
};

export default registerWrongWayHandlers;
