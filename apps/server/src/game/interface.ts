import { Server as SocketIOServer, Socket } from "socket.io";

export type GameDatabase = { shared: any; local: any }
export type SocketHandler = (io: SocketIOServer, socket: Socket, database: GameDatabase) => Promise<void> | void
export type SocketListener = (...args: any[]) => Promise<void> | void
