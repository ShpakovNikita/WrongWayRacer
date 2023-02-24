import {Vec2} from "@splash/types";
import {PlayerDeathPayload, WrongWayRacerEvents} from "./game-logic.events";
import {TypedEmitter} from "tiny-typed-emitter";
import { v4 as uuidv4 } from 'uuid';

export type WrongWayRacerGameLogicConfig = {
    timerSpeed: number;
    carsSpeed: number;

    minSpawnTime: number;
    maxSpawnTime: number;
    multiplySpawnWithSpeed: boolean;
    decreaseSpawnTimeWithSpeed: boolean;
}

export type Car = {
    id: string;
    position: Vec2;
}

export type Player = {
    road: number;
    id: string;
    alive: boolean;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Map is 2d grid, n x m.
 * - n: is a number of roads (which will be 3 for this game)
 * - m: is a distance of player view.
 * For this game, player stays always on one place, and cars approaching player
 */
const roadsCount = 3;
const playerView = 10;

// TODO: implement ECS approach
export class WrongWayRacerGameLogic {
    private _config: WrongWayRacerGameLogicConfig;
    private readonly _globalTimer: number;

    private _cars: Car[] = [];
    private _players: Player[] = [];

    private _isGameStarted = false;

    private readonly _eventEmitter: TypedEmitter<WrongWayRacerEvents>;

    constructor(config: WrongWayRacerGameLogicConfig) {
        this._config = config
        this._globalTimer = 0

        this._eventEmitter = new TypedEmitter<WrongWayRacerEvents>();
        this.setupEvents()
    }

    public get eventEmitter(): TypedEmitter<WrongWayRacerEvents> {
        return this._eventEmitter
    }

    public get cars(): Car[] {
        return this._cars
    }

    public get players(): Player[] {
        return this._players
    }

    public get globalTime(): number {
        return this._globalTimer
    }

    public addPlayer = (playerId: string) => {
        if (!this._isGameStarted && !this.findPlayerById(playerId)) {
            this._players.push({
                id: playerId, alive: true, road: Math.floor(roadsCount / 2)
            })
        }
    }

    public startGame = () => {
        this._isGameStarted = true
    }

    public movePlayerLeft = (playerId: string) => {
        const player = this.findPlayerById(playerId)
        if (player) {
            player.road = Math.max(player.road - 1, 0)
        }
    }

    public movePlayerRight = (playerId: string) => {
        const player = this.findPlayerById(playerId)
        if (player) {
            player.road = Math.min(player.road + 1, roadsCount - 1)
        }
    }

    public gameLoop = (dt: number) => {
        if (!this._isGameStarted) {
            return
        }

        const acceleratedDeltaTime = dt * this._config.timerSpeed
        this.carSpawner(acceleratedDeltaTime)
        this.moveCars(acceleratedDeltaTime)
        this.collisionCheck()
        this.removeOutOfBoundCars(acceleratedDeltaTime)
    }

    private onPlayerDeath = ({playerId }: PlayerDeathPayload) => {
        const player = this.findPlayerById(playerId)
        if (player) {
            player.alive = false

            const alivePlayerFound = this._players.findIndex(player => player.alive) > -1
            if (!alivePlayerFound) {
                 this._eventEmitter.emit("gameFinished", {winnerPlayerId: player.id, finishTime: this._globalTimer})
            }
        }
    }

    private setupEvents = () => {
        this._eventEmitter.addListener('playerDeath', this.onPlayerDeath)
    }

    private _timeToSpawnCar: number = 1.0;

    private carSpawner = (dt: number) => {
        this._timeToSpawnCar -= dt;

        if (this._timeToSpawnCar <= 0) {
            let spawnTime = getRandomArbitrary(this._config.minSpawnTime, this._config.maxSpawnTime)
            if (this._config.multiplySpawnWithSpeed) {
                spawnTime /= this._config.timerSpeed
            }

            this._timeToSpawnCar = spawnTime;

            const spawnPosition: Vec2 =  [getRandomInt(roadsCount), playerView]
            const spawnedCar: Car = { position: spawnPosition, id: uuidv4() }
            this._cars.push(spawnedCar)
        }
    }

    private moveCars = (dt: number) => {
        for (const car of this._cars) {
            car.position[1] -= dt * this._config.carsSpeed
        }
    }

    private removeOutOfBoundCars = (dt: number) => {
        let i = this._cars.length - 1
        while (i > 0) {
            const car = this._cars[i]
            if (car.position[1] < 0) {
                this._cars.slice(i, 1)
                i -= 1
            }
        }
    }

    private collisionCheck = () => {
        // TODO: Improve bad naive approach. Optimally you should use structures like quadtree, but for this game
        // without extensive numbers of collision objects it should be ok
        for (const car of this._cars) {
            for (const player of this._players) {
                if (car.position[0] === player.road && car.position[0] <= 0) {
                    this._eventEmitter.emit("playerDeath", {playerId: player.id, road: player.road})
                }
            }
        }
    }

    private findPlayerById = (playerId: string): Player | undefined => {
        const index = this._players.findIndex(player => playerId === player.id)
        if (index >= 0) {
            const player = this._players[index]
            return player
        }
        return undefined
    }
}
