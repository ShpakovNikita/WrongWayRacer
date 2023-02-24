import { UserProfile } from '@splash/types';
import { DatabaseError } from './interface';
import { IGameArena } from '../arena/arena.interface';

class SharedDatabase {
  private readonly _gameArenas: { [key: string]: IGameArena };
  private readonly _users: { [key: string]: UserProfile };
  private readonly _userToConnectedArena: { [key: string]: IGameArena };

  constructor() {
    this._gameArenas = {};
    this._users = {};
    this._userToConnectedArena = {};
  }

  public getConnectedArenaByUserId = (id: string): IGameArena => {
    return this._userToConnectedArena[id];
  };

  public addConnectedArenaByUserId = (id: string, arena: IGameArena): void => {
    if (this._userToConnectedArena[id] === undefined) {
      this._userToConnectedArena[id] = arena;
    } else {
      throw new DatabaseError(`Trying to add new arena to user ${id}!`);
    }
  };

  public removeConnectedArenaByUserId = (id: string): IGameArena => {
    const arena = this._userToConnectedArena[id];
    this._userToConnectedArena[id] = undefined;
    return arena;
  };

  public addUser = (user: UserProfile): void => {
    if (this._users[user.id] === undefined) {
      this._users[user.id] = user;
    } else {
      throw new DatabaseError(`Trying to create user with existing ID ${user.id}!`);
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
      throw new DatabaseError(`Trying to add arena with existing ID ${arena.arenaId}!`);
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

export default SharedDatabase;
