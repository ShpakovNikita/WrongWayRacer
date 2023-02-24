import { IGameArena } from './arena.interface';

class GameArena implements IGameArena {
  private readonly _arenaId: string;

  constructor(arenaId: string) {
    this._arenaId = arenaId;
  }

  public get arenaId() {
    return this._arenaId;
  }
}

export default GameArena;
