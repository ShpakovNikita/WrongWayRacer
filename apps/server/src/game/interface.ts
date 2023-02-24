import { Server as SocketIOServer, Socket } from 'socket.io';
import { SharedDatabase } from './database';

export type LocalDatabase = any;

export type GameDatabase = { shared: SharedDatabase; local: LocalDatabase };
export type SocketHandler = (
  io: SocketIOServer,
  socket: Socket,
  database: GameDatabase
) => Promise<void> | void;
export type SocketListener = (...args: any[]) => Promise<void> | void;
