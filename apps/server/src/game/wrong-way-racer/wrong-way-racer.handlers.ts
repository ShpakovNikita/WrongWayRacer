import {GameDatabase, SocketHandler, SocketListener} from "../interface";
import {Socket, Server} from "socket.io";

const leftPressed = (io: Server, socket: Socket, database: GameDatabase): SocketListener => {
  return (payload, callback) => {}
}

const rightPressed = (io: Server, socket: Socket, database: GameDatabase): SocketListener =>  {
  return async (payload, callback) => {}
}

const registerWrongWayHandlers: SocketHandler = (io, socket, database: GameDatabase) => {
  socket.on("wrongWayRacer:leftPressed", leftPressed(io, socket, database));
  socket.on("wrongWayRacer:rightPressed", rightPressed(io, socket, database));
}

export default registerWrongWayHandlers
