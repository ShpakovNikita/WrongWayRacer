import { UserProfile } from '@splash/types';
import { GameServerError } from './interface';
import { IGameArena } from '../arena/arena.interface';
import { ILogManager } from '@splash/logger';

class GameServer {
  private readonly _logger?: ILogManager;

  private readonly _gameArenas: { [key: string]: IGameArena };
  private readonly _users: { [key: string]: UserProfile };

  constructor(logger?: ILogManager) {
    this._gameArenas = {};
    this._users = {};
    this._logger = logger;
  }

  public shutdown = async (): Promise<void> => {
    for (const [_, arena] of Object.entries(this._gameArenas)) {
      await arena.shutdown();
    }
  };

  public getConnectedArenaByUserId = (id: string): IGameArena | undefined => {
    // Not optimal, but ok for now
    for (const [arenaId, arena] of Object.entries(this._gameArenas)) {
      const user = arena?.connectedUsers.find((user) => user.id === id);

      if (user) {
        return arena;
      }
    }
  };

  public addUser = (user: UserProfile): void => {
    if (this._users[user.id] === undefined) {
      this._users[user.id] = user;
    } else {
      throw new GameServerError(`Trying to create user with existing ID ${user.id}!`);
    }
  };

  public getUserById = (id: string): UserProfile | undefined => {
    return this._users[id];
  };

  public getUserByUsername = (username: string): UserProfile | undefined => {
    return Object.values(this._users)
      .filter((user) => username === user.username)
      .at(0);
  };

  public addGameArena = (arena: IGameArena): void => {
    if (this._gameArenas[arena.arenaId] === undefined) {
      this._gameArenas[arena.arenaId] = arena;
    } else {
      throw new GameServerError(`Trying to add arena with existing ID ${arena.arenaId}!`);
    }
  };

  public getGameArenaById = (id: string): IGameArena | undefined => {
    return this._gameArenas[id];
  };

  public removeGameArenaById = (id: string): IGameArena | undefined => {
    const arena = this._gameArenas[id];
    this._gameArenas[id] = undefined;
    return arena;
  };
}

export default GameServer;
