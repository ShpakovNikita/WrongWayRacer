import GameServer from './game-server';
import { v4 as uuidv4 } from 'uuid';
import { GameServerError } from './interface';
import GameArena from '../arena/arena';

describe('Check game server', () => {
  let sharedDatabase: GameServer;
  let userId: string;
  let wrongWayArenaId: string;

  beforeAll(() => {
    sharedDatabase = new GameServer();
    userId = uuidv4();
    wrongWayArenaId = uuidv4();
  });

  test('Test non existing addUser => error not thrown', () => {
    sharedDatabase.addUser({
      id: userId,
      username: 'BruceWayne'
    });
  });

  test('Test existing getUserById => user returned', () => {
    const user = sharedDatabase.getUserById(userId);

    expect(user.id).toBe(userId);
    expect(user.username).toBe('BruceWayne');
  });

  test('Test existing addUser (id) => error thrown', () => {
    const throwing = () => {
      sharedDatabase.addUser({
        id: userId,
        username: 'BruceWayne'
      });
    };
    expect(throwing).toThrow(GameServerError);
  });

  test('Test non existing addWrongWayRacerArena => error not thrown', () => {
    sharedDatabase.addGameArena(new GameArena(wrongWayArenaId));
  });

  test('Test getWrongWayRacerArenaById => arena returned', () => {
    const arena = sharedDatabase.getGameArenaById(wrongWayArenaId);

    expect(arena.arenaId).toBe(wrongWayArenaId);
  });

  test('Test add existing addWrongWayRacerArena (id) => error thrown', () => {
    const throwing = () => {
      sharedDatabase.addGameArena(new GameArena(wrongWayArenaId));
    };
    expect(throwing).toThrow(GameServerError);
  });

  test('Test removeWrongWayRacerArenaById => arena removed', () => {
    sharedDatabase.removeGameArenaById(wrongWayArenaId);
    const arena = sharedDatabase.getGameArenaById(wrongWayArenaId);
    expect(arena).toBe(undefined);
  });
});
