export type WrongWayRacerGameLogicConfig = {
  timerSpeed: number;
  carsSpeed: number;

  minSpawnTime: number;
  maxSpawnTime: number;
  multiplySpawnWithSpeed: boolean;
  decreaseSpawnTimeWithSpeed: boolean;

  serverSide: boolean;
};

export const getWrongWayRacerConfig = (
  gameSpeed: number,
  serverSide: boolean
): WrongWayRacerGameLogicConfig => {
  const clampedGameSpeed = Math.min(Math.max(0, gameSpeed), 6);

  return {
    timerSpeed: 1.0,
    carsSpeed: 1.0 + clampedGameSpeed / 3.0,

    minSpawnTime: 1.0,
    maxSpawnTime: 2.0,
    multiplySpawnWithSpeed: true,
    decreaseSpawnTimeWithSpeed: true,

    serverSide
  };
};
