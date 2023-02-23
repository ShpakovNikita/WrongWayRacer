import {GameDatabase, SocketHandler, SocketListener} from "../interface";
import {Socket, Server} from "socket.io";

const createUser = (io: Server, socket: Socket, database: GameDatabase): SocketListener => {
  return (payload) => {}
}

const startWrongWayRacer = (io: Server, socket: Socket, database: GameDatabase): SocketListener =>  {
  return (payload) => {}
}

const registerLobbyHandlers: SocketHandler = (io, socket, database: GameDatabase) => {
  socket.on("lobby:createUser", createUser(io, socket, database));
  socket.on("lobby:startWrongWayRacer", startWrongWayRacer(io, socket, database));
}

export default registerLobbyHandlers
