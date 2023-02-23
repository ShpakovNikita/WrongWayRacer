import {GameDatabase, SocketHandler, SocketListener} from "../interface";
import {Socket, Server} from "socket.io";
import {WrongWayRacerEventType} from "@splash/types";

const leftPressed = (io: Server, socket: Socket, database: GameDatabase): SocketListener => {
  return (payload, callback) => {}
}

const rightPressed = (io: Server, socket: Socket, database: GameDatabase): SocketListener =>  {
  return async (payload, callback) => {}
}

const registerWrongWayHandlers: SocketHandler = (io, socket, database: GameDatabase) => {
  socket.on(WrongWayRacerEventType.leftPressed, leftPressed(io, socket, database));
  socket.on(WrongWayRacerEventType.rightPressed, rightPressed(io, socket, database));
}

export default registerWrongWayHandlers
