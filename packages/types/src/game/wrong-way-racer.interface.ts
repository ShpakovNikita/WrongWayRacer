import {Vec2} from "./dimensions";

export enum WrongWayRacerSocketEventType {
    // User game logic
    leftPressed = "wrongWayRacer:leftPressed",
    rightPressed = "wrongWayRacer:rightPressed",

    // Server game logic
    carsUpdated = "wrongWayRacer:carsUpdated",
    playersUpdated = "wrongWayRacer:playersUpdated",
    playerExploded = "wrongWayRacer:playerExploded",
    timerUpdated = "wrongWayRacer:timerUpdated",
    gameFinished = "wrongWayRacer:gameFinished",
}

export type CarsUpdatedSocketPayload = {
    cars: {
        id: string;
        position: Vec2;
    }[]
}

export type PlayersUpdatedSocketPayload = {
    players: {
        id: string;
        road: number;
    }[]
}

export type GameFinishedSocketPayload = {
    winnerId: string;
    gameFinishedTime: number;
}

export type TimerUpdatedSocketPayload = {
    gameTime: number;
}

export type PlayerExplodedSocketPayload = {
    playerId: string;
    road: number;
}
