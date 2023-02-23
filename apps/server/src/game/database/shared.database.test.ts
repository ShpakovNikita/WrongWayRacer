import SharedDatabase from "./shared.database";
import { v4 as uuidv4 } from 'uuid';
import {DatabaseError} from "./interface";
import {IWrongWayRacerArena} from "../wrong-way-racer/wrong-way-racer.arena";

export class WrongWayRacerArenaTest implements IWrongWayRacerArena {
  private readonly _arenaId: string

  constructor(arenaId: string) {
    this._arenaId = arenaId
  }

  public get arenaId() {
    return this._arenaId;
  }
}

describe("Check shared database", () => {
  let sharedDatabase: SharedDatabase;
  let userId: string;
  let wrongWayArenaId: string;

  beforeAll(() => {
    sharedDatabase = new SharedDatabase();
    userId = uuidv4();
    wrongWayArenaId = uuidv4();
  });

  test("Test non existing addUser => error not thrown", () => {
    sharedDatabase.addUser({
        id: userId,
        username: "BruceWayne"
    })
  });

  test("Test existing getUserById => user returned", () => {
    const user = sharedDatabase.getUserById(userId)

    expect(user.id).toBe(userId)
    expect(user.username).toBe("BruceWayne")
  });

  test("Test existing addUser (id) => error thrown", () => {
    const throwing = () => {
      sharedDatabase.addUser({
        id: userId,
        username: "BruceWayne"
      })
    };
    expect(throwing).toThrow(DatabaseError);
  });

  test("Test non existing addWrongWayRacerArena => error not thrown", () => {
    sharedDatabase.addWrongWayRacerArena(new WrongWayRacerArenaTest(wrongWayArenaId))
  });

  test("Test getWrongWayRacerArenaById => arena returned", () => {
    const arena = sharedDatabase.getWrongWayRacerArenaById(wrongWayArenaId)

    expect(arena.arenaId).toBe(wrongWayArenaId)
  });

  test("Test add existing addWrongWayRacerArena (id) => error thrown", () => {
    const throwing = () => {
      sharedDatabase.addWrongWayRacerArena(new WrongWayRacerArenaTest(wrongWayArenaId))
    };
    expect(throwing).toThrow(DatabaseError);
  });

  test("Test removeWrongWayRacerArenaById => arena removed", () => {
    sharedDatabase.removeWrongWayRacerArenaById(wrongWayArenaId)
    const arena = sharedDatabase.getWrongWayRacerArenaById(wrongWayArenaId)
    expect(arena).toBe(undefined)
  });
});
