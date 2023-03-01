import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import logger from '@/logging';
import { ILobbyControllerDelegate, LobbySocketController } from '@/api/socket/Lobby.controller';
import { room } from '@/context/Lobby/Lobby.data';

// there is no window object on the server
enableStaticRendering(typeof window === 'undefined');

const gameSpeed = 2;

class LobbyStore implements ILobbyControllerDelegate {
  private _loading = true;
  private _inArena = false;

  private _lobbySocketController: LobbySocketController;

  private static _store: LobbyStore;

  public static get store(): LobbyStore {
    // For server side rendering always create a new store
    if (typeof window === 'undefined') {
      return new this();
    }

    // Create the store once in the client for each new channel
    // eslint-disable-next-line no-return-assign
    return this._store || (this._store = new this());
  }

  constructor() {
    makeAutoObservable(this);

    this._lobbySocketController = new LobbySocketController(this);
  }

  public get inArena() {
    return this._inArena;
  }

  public set inArena(value: boolean) {
    this._inArena = value;
  }

  public get loading() {
    return this._loading;
  }

  public set loading(value: boolean) {
    this._loading = value;
  }

  public get connected() {
    return this._lobbySocketController.connected;
  }

  public activateStore = async () => {
    logger.debug('Activating Lobby store');

    this.loading = true;

    this._lobbySocketController.activate();

    this.loading = false;
  };

  public deactivateStore = async () => {
    logger.debug('Deactivating Lobby store');

    this._lobbySocketController.deactivate();
  };

  public startGame = async () => {
    try {
      this.inArena = true;
      await this._lobbySocketController.startWrongWayRacerGame({ gameSpeed });
    } catch (e) {
      this.inArena = false;
    }
  };

  public get lobbyData() {
    return room;
  }

  /** MARK: ILobbyControllerDelegate */
  public onEnteredArena = async () => {
    this.inArena = true;
  };

  public onLeavedArena = async () => {
    this.inArena = false;
  };
}

export default LobbyStore;
