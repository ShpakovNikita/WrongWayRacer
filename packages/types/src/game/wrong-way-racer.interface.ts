import {Vec2} from "./dimensions";

export enum WrongWayRacerEventType {
    // User game logic
    leftPressed = "wrongWayRacer:leftPressed",
    rightPressed = "wrongWayRacer:rightPressed",

    // Server game logic
    carSpawned = "wrongWayRacer:carSpawned",
    carMoved = "wrongWayRacer:carMoved",
    playerExploded = "wrongWayRacer:playerExploded",
    timerUpdated = "wrongWayRacer:timerUpdated",
}

export type CarMovedPayload = {
    carId: string;
    newPosition: Vec2;
}
