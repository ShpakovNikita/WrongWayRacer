import { Server as SocketIOServer, Socket } from 'socket.io';
import { GameServer } from './server';
import { ILogManager } from '@splash/logger';

export type SocketHandler = (
  io: SocketIOServer,
  socket: Socket,
  gameServer: GameServer,
  logger?: ILogManager
) => Promise<void> | void;

export type SocketListener = (...args: any[]) => Promise<void> | void;
