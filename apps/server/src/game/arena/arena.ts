import { ArenaUser, IGameArena } from './arena.interface';
import { UserProfile } from '@splash/types';
import { Socket } from 'socket.io';
import { WrongWayRacerArenaError } from '../wrong-way-racer/arena/wrong-way-racer.arena';
import { ILogManager } from '@splash/logger';

class GameArena implements IGameArena {
  private readonly _arenaId: string;
  private _connectedUsers: ArenaUser[] = [];

  protected _logger?: ILogManager;

  constructor(arenaId: string, logger?: ILogManager) {
    this._arenaId = arenaId;
    this._logger = logger;
  }

  public get arenaId() {
    return this._arenaId;
  }

  public get connectedUsers(): ArenaUser[] {
    return this._connectedUsers;
  }

  public connectUser = (connectingUser: UserProfile, socket: Socket): void => {
    this._logger?.debug(`Connecting user ${JSON.stringify(connectingUser)}...`);

    const activeUser = this._connectedUsers.find((user) => user.username === connectingUser.username);
    if (activeUser) {
      this._logger?.debug(`Connected users list: ${JSON.stringify(this._connectedUsers)}`);
      throw new WrongWayRacerArenaError(
        `Trying to connect already connected user ${JSON.stringify(connectingUser)}`
      );
    }

    this._connectedUsers.push({ ...connectingUser, socket });
    socket.join(this.arenaId);

    this._logger?.debug(`User ${JSON.stringify(connectingUser)} connected`);

    this.onUserConnected(connectingUser, socket);
  };

  public disconnectUser = (disconnectingUser: UserProfile): void => {
    this._logger?.debug(
      `Disconnecting user with id ${disconnectingUser.id} and username ${disconnectingUser.username}...`
    );

    const activeUserIndex = this._connectedUsers.findIndex(
      (user) => user.username === disconnectingUser.username
    );
    if (activeUserIndex < 0) {
      throw new WrongWayRacerArenaError(
        `Trying to disconnect not connected user ${JSON.stringify(disconnectingUser)}`
      );
    }

    const socket = this._connectedUsers[activeUserIndex].socket;
    this._connectedUsers.splice(activeUserIndex, 1);
    socket.leave(this.arenaId);

    this._logger?.debug(`User with id ${disconnectingUser.id} disconnected`);

    this.onUserDisconnected(disconnectingUser);
  };

  public shutdown() {
    this._logger?.info(`Shutting down arena with id ${this.arenaId}`);
    this.onShutdownBegin();

    for (const user of this.connectedUsers) {
      this.disconnectUser(user);
    }

    this.onShutdownEnd();
  }

  /** MARK: Override some logic if needed */

  protected onUserConnected(connectingUser: UserProfile, socket: Socket) {}
  protected onUserDisconnected(disconnectingUser: UserProfile) {}

  protected onShutdownBegin() {}
  protected onShutdownEnd() {}
}

export default GameArena;
