import {GameDatabase, SocketHandler, SocketListener} from "../interface";
import {Socket, Server} from "socket.io";
import {WrongWayRacerSocketEventType} from "@splash/types";

const leftPressed = (io: Server, socket: Socket, database: GameDatabase): SocketListener => {
  return () => {
    const arena = database.shared.getConnectedArenaByUserId(socket.id)
    arena?.onLeftPressed(socket.id)
  }
}

const rightPressed = (io: Server, socket: Socket, database: GameDatabase): SocketListener =>  {
  return async () => {
    const arena = database.shared.getConnectedArenaByUserId(socket.id)
    arena?.onRightPressed(socket.id)
  }
}

const registerWrongWayHandlers: SocketHandler = (io, socket, database: GameDatabase) => {
  socket.on(WrongWayRacerSocketEventType.leftPressed, leftPressed(io, socket, database));
  socket.on(WrongWayRacerSocketEventType.rightPressed, rightPressed(io, socket, database));
}

export default registerWrongWayHandlers
