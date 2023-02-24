import { WrongWayRacerGameLogic } from './game-logic';

describe('Check wrong way racer game logic', () => {
  test('Test non existing addUser => error not thrown', (done) => {
    const gameLogic = new WrongWayRacerGameLogic({
      timerSpeed: 1.0,
      carsSpeed: 1.0,

      minSpawnTime: 1.0,
      maxSpawnTime: 3.0,
      multiplySpawnWithSpeed: true,
      decreaseSpawnTimeWithSpeed: false
    });
  });
});
