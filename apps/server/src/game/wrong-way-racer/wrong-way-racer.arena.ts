import {UserProfile} from "@splash/types";
import {Server, Socket} from "socket.io";
import {WrongWayRacerGameLogic, WrongWayRacerGameLogicConfig} from "./game-logic/game-logic";

type GameUser = UserProfile & {
    deathTime?: number;
    socket: Socket;
}

export class WrongWayRacerArenaError extends Error {
  constructor(message) {
    super(message);
    this.name = "WrongWayRacerArenaError";
  }
}

export interface IWrongWayRacerArena {
    arenaId: string;
}

export class WrongWayRacerArena implements IWrongWayRacerArena {
    private readonly _arenaId: string
    private readonly _activeUsers: GameUser[];
    private readonly _io: Server;
    private readonly _gameLogic: WrongWayRacerGameLogic;

    constructor(arenaId: string, io: Server, config: WrongWayRacerGameLogicConfig) {
        this._arenaId = arenaId
        this._io = io
        this._gameLogic = new WrongWayRacerGameLogic(config);
    }

    public get arenaId() {
        return this._arenaId;
    }

    public connectUser = (connectingUser: UserProfile, socket: Socket): void => {
        if (this._activeUsers.filter(user => user.username === connectingUser.username)) {
            throw new WrongWayRacerArenaError(`Trying to connect already connected user ${JSON.stringify(connectingUser)}`)
        }

        this._activeUsers.push({...connectingUser, socket})
        socket.join(this._arenaId)
    }

    public disconnectUser = (disconnectingUser: UserProfile): void => {
        const activeUserIndex = this._activeUsers.findIndex(user => user.username === disconnectingUser.username);
        if (activeUserIndex < 0) {
            throw new WrongWayRacerArenaError(`Trying to disconnect not connected user ${JSON.stringify(disconnectingUser)}`)
        }

        this._activeUsers.splice(activeUserIndex, 1)
    }

    public startGame = () => {

    }

    public gameLoop = (dt: number) => {

    }
}
