import { Vec2 } from '@splash/types';
import { PlayerDeathPayload, WrongWayRacerEvents } from './game-logic.events';
import { TypedEmitter } from 'tiny-typed-emitter';
import { v4 as uuidv4 } from 'uuid';
import { WrongWayRacerGameLogicConfig } from './game-logic.config';

export type Car = {
  id: string;
  position: Vec2;
};

export type Player = {
  road: number;
  id: string;
  alive: boolean;
};

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
export const roadsCount = 3;
export const playerViewDistance = 6;
export const playerCarStart = 0;
export const carLength = 1;

// TODO: implement ECS approach
export class WrongWayRacerGameLogic {
  private _config: WrongWayRacerGameLogicConfig;
  private _globalTimer: number;

  private _cars: Car[] = [];
  private _players: Player[] = [];

  private _isGameStarted = false;

  private readonly _eventEmitter: TypedEmitter<WrongWayRacerEvents>;

  constructor(config: WrongWayRacerGameLogicConfig) {
    this._config = config;
    this._globalTimer = 0;

    this._eventEmitter = new TypedEmitter<WrongWayRacerEvents>();
    this.setupEvents();
  }

  public get eventEmitter(): TypedEmitter<WrongWayRacerEvents> {
    return this._eventEmitter;
  }

  public get cars(): Car[] {
    return this._cars;
  }

  public set cars(value) {
    if (!this._config.serverSide) {
      this._cars = value;
    } else {
      throw new Error(
        "Setting car values from external is not allowed from the server! Server's Game Logic is the only source of truth"
      );
    }
  }

  public get players(): Player[] {
    return this._players;
  }

  public get globalTime(): number {
    return this._globalTimer;
  }

  public set globalTime(value) {
    if (!this._config.serverSide) {
      this._globalTimer = value;
    } else {
      throw new Error(
        "Setting car values from external is not allowed from the server! Server's Game Logic is the only source of truth"
      );
    }
  }

  public addPlayer = (playerId: string) => {
    if (!this._isGameStarted && !this.findPlayerById(playerId)) {
      this._players.push({
        id: playerId,
        alive: true,
        road: Math.floor(roadsCount / 2)
      });
    }
  };

  public startGame = () => {
    this._isGameStarted = true;
  };

  public movePlayerLeft = (playerId: string) => {
    const player = this.findPlayerById(playerId);
    if (player) {
      player.road = Math.max(player.road - 1, 0);
    }
  };

  public movePlayerRight = (playerId: string) => {
    const player = this.findPlayerById(playerId);
    if (player) {
      player.road = Math.min(player.road + 1, roadsCount - 1);
    }
  };

  public gameLoop = (dt: number) => {
    if (!this._isGameStarted) {
      return;
    }

    const acceleratedDeltaTime = dt * this._config.timerSpeed;
    if (this._config.serverSide) {
      this.carSpawner(acceleratedDeltaTime);
    }

    this.moveCars(acceleratedDeltaTime);

    if (this._config.serverSide) {
      this.collisionCheck();
    }

    this.removeOutOfBoundCars(acceleratedDeltaTime);

    this._globalTimer += dt;
  };

  private onPlayerDeath = ({ playerId }: PlayerDeathPayload) => {
    const player = this.findPlayerById(playerId);
    if (player) {
      player.alive = false;

      const alivePlayerFound = this._players.findIndex((player) => player.alive) > -1;
      if (!alivePlayerFound) {
        this._eventEmitter.emit('gameFinished', { winnerPlayerId: player.id, finishTime: this._globalTimer });
      }
    }
  };

  private setupEvents = () => {
    this._eventEmitter.addListener('playerDeath', this.onPlayerDeath);
  };

  private _timeToSpawnCar: number = 1.0;

  private carSpawner = (dt: number) => {
    this._timeToSpawnCar -= dt;

    if (this._timeToSpawnCar <= 0) {
      let spawnTime = getRandomArbitrary(this._config.minSpawnTime, this._config.maxSpawnTime);
      if (this._config.multiplySpawnWithSpeed) {
        spawnTime /= this._config.timerSpeed;
      }

      this._timeToSpawnCar = spawnTime;

      const spawnPosition: Vec2 = [getRandomInt(roadsCount), playerViewDistance];
      const spawnedCar: Car = { position: spawnPosition, id: uuidv4() };
      this._cars.push(spawnedCar);
    }
  };

  private moveCars = (dt: number) => {
    for (const car of this._cars) {
      car.position[1] -= dt * this._config.carsSpeed;
    }
  };

  private removeOutOfBoundCars = (dt: number) => {
    this._cars = this._cars.filter((car) => car.position[1] > 0);
  };

  private collisionCheck = () => {
    // TODO: Improve bad naive approach. Optimally you should use structures like quadtree, but for this game
    // without extensive numbers of collision objects it should be ok
    for (const car of this._cars) {
      for (const player of this._players) {
        if (
          car.position[0] === player.road &&
          playerCarStart <= car.position[1] &&
          car.position[1] <= playerCarStart + carLength
        ) {
          this._eventEmitter.emit('playerDeath', { playerId: player.id, road: player.road });
        }
      }
    }
  };

  private findPlayerById = (playerId: string): Player | undefined => {
    const index = this._players.findIndex((player) => playerId === player.id);
    if (index >= 0) {
      const player = this._players[index];
      return player;
    }
    return undefined;
  };
}
