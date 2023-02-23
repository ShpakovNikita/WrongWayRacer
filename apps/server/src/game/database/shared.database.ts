import {UserProfile} from "@splash/types";
import {DatabaseError} from "./interface";
import {IWrongWayRacerArena} from "../wrong-way-racer/wrong-way-racer.arena";

class SharedDatabase {
    private readonly _wrongWayRacerArenas: {[key: string]: IWrongWayRacerArena }
    private readonly _users: {[key: string]: UserProfile}

    constructor() {
        this._wrongWayRacerArenas = {}
        this._users = {}
    }

    public addUser = (user: UserProfile): void => {
        if (this._users[user.id] === undefined) {
            this._users[user.id] = user;
        } else {
            throw new DatabaseError(`Trying to create user with existing ID ${user.id}!`)
        }
    }

    public getUserById = (id: string): UserProfile | undefined => {
        return this._users[id]
    }

    public getUserByUsername = (username: string): UserProfile | undefined => {
        return Object.values(this._users).filter((user) => username === user.username).at(0)
    }

    public addWrongWayRacerArena = (arena: IWrongWayRacerArena): void => {
        if (this._wrongWayRacerArenas[arena.arenaId] === undefined) {
            this._wrongWayRacerArenas[arena.arenaId] = arena;
        } else {
            throw new DatabaseError(`Trying to add arena with existing ID ${arena.arenaId}!`)
        }
    }

    public getWrongWayRacerArenaById = (id: string): IWrongWayRacerArena | undefined => {
        return this._wrongWayRacerArenas[id]
    }

    public removeWrongWayRacerArenaById = (id: string): IWrongWayRacerArena | undefined => {
        const arena = this._wrongWayRacerArenas[id]
        this._wrongWayRacerArenas[id] = undefined
        return arena
    }
}

export default SharedDatabase
