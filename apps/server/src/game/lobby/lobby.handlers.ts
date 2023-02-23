import {GameDatabase, SocketHandler, SocketListener} from "../interface";
import {Socket, Server} from "socket.io";
import {CreateUserPayload, LobbyEventType, CallbackStatus, StartWrongWayRacerPayload } from "@splash/types";
import { v4 as uuidv4 } from 'uuid';
import {WrongWayRacerArena} from "../wrong-way-racer/wrong-way-racer.arena";
import {WrongWayRacerGameLogicConfig} from "../wrong-way-racer/game-logic";

const createUser = (io: Server, socket: Socket, database: GameDatabase): SocketListener => {
  return ({username}: CreateUserPayload, callback) => {
    if (database.shared.getUserByUsername(username)) {
      callback({status: CallbackStatus.nok})
    } else {

      // TODO: make users persistent, using JWT auth
      database.shared.addUser({
        username,
        id: socket.id
      })

      callback({status: CallbackStatus.ok})
    }
  }
}

const getWrongWayRacerConfig = (gameSpeed: number): WrongWayRacerGameLogicConfig => {
  const clampedGameSpeed = Math.min(Math.max(0, gameSpeed), 6)

  return {
    timerSpeed: 1.0,
    carsSpeed: 1.0 + clampedGameSpeed / 3.0,

    minSpawnTime: 1.0,
    maxSpawnTime: 2.0,
    multiplySpawnWithSpeed: true,
    decreaseSpawnTimeWithSpeed: true,
  }
}

const startWrongWayRacer = (io: Server, socket: Socket, database: GameDatabase): SocketListener =>  {
  // TODO: It's better to start another small server instance for different arenas
  return ({gameSpeed}: StartWrongWayRacerPayload) => {
    const arenaId = `wrongWayRacer:${uuidv4()}`
    const arenaConfig = getWrongWayRacerConfig(gameSpeed)
    const wrongWayRacerArena = new WrongWayRacerArena(arenaId, io, arenaConfig)
    database.shared.addWrongWayRacerArena(wrongWayRacerArena);

    const user = database.shared.getUserById(socket.id)
    if (user) {
      wrongWayRacerArena.connectUser(user, socket)
    }
  }
}

const registerLobbyHandlers: SocketHandler = (io, socket, database: GameDatabase) => {
  socket.on(LobbyEventType.createUser, createUser(io, socket, database));
  socket.on(LobbyEventType.startWrongWayRacer, startWrongWayRacer(io, socket, database));
}

export default registerLobbyHandlers