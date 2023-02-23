export interface WrongWayRacerEvents {
  'playerDeath': (payload: PlayerDeathPayload) => void;
  'gameFinished': (payload: GameFinishedPayload) => void;
}

export type PlayerDeathPayload = {
  playerId: string;
  road: number;
}

export type GameFinishedPayload = {
  winnerPlayerId: string;
  finishTime: number;
}
