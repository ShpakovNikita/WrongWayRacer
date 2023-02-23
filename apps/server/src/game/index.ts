import registerWrongWayHandlers from "./wrong-way-racer";
import registerLobbyHandlers from "./lobby";
import {SocketHandler} from "./interface";

const registerGameHandlers: {[key: string]: SocketHandler} = {
    registerWrongWayHandlers,
    registerLobbyHandlers
}

export { registerGameHandlers }
