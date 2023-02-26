import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import {
  explosionSpriteSheetAtlasData,
  WrongWayRacerSprites
} from '@/context/WrongWayRacer/WrongWayRacer.resources';
import * as PIXI from 'pixi.js';
import { io } from 'socket.io-client';
import { envConfig } from '@/configs/env';
import {
  CarsUpdatedSocketPayload,
  GameFinishedSocketPayload,
  PlayerExplodedSocketPayload,
  PlayersUpdatedSocketPayload,
  TimerUpdatedSocketPayload
} from '@splash/types';
import {
  IWrongWayRacerControllerDelegate,
  WrongWayRacerController
} from '@/api/socket/WrongWayRacer.controller';

// there is no window object on the server
enableStaticRendering(typeof window === 'undefined');

export default class WrongWayRacerStore implements IWrongWayRacerControllerDelegate {
  private _loading = true;
  private _connected = false;
  private _wrongWayRacerSocketController: WrongWayRacerController;

  private readonly _resources: { [key: string]: PIXI.Spritesheet | PIXI.BaseTexture };

  private static _store: WrongWayRacerStore;

  public static get store(): WrongWayRacerStore {
    // For server side rendering always create a new store
    if (typeof window === 'undefined') {
      return new this();
    }

    // Create the store once in the client for each new channel
    // eslint-disable-next-line no-return-assign
    return this._store || (this._store = new this());
  }

  constructor() {
    this._resources = {};

    makeAutoObservable(this);

    const socket = io(envConfig.backendUrl, { transports: ['websocket'] });
    this._wrongWayRacerSocketController = new WrongWayRacerController(this, socket);
  }

  public get loading() {
    return this._loading;
  }

  public set loading(value: boolean) {
    this._loading = value;
  }

  public get connected() {
    return this._connected;
  }

  public set connected(value: boolean) {
    this._connected = value;
  }

  public activateStore = async () => {
    this.loading = true;

    await this.precacheSceneTextures();
    this._wrongWayRacerSocketController.activate();

    this.loading = false;
  };

  public deactivateStore = async () => {
    this._wrongWayRacerSocketController.deactivate();
    PIXI.utils.destroyTextureCache();
  };

  public get resources() {
    return this._resources;
  }

  private precacheSceneTextures = async () => {
    for (const texturePath of Object.values(WrongWayRacerSprites)) {
      await PIXI.Assets.load(texturePath);
      this._resources[texturePath] = PIXI.BaseTexture.from(texturePath);
    }

    const explosionSpriteSheet = new PIXI.Spritesheet(
      PIXI.BaseTexture.from(WrongWayRacerSprites.explosionSpriteSheet),
      explosionSpriteSheetAtlasData
    );
    await explosionSpriteSheet.parse();
    this._resources[WrongWayRacerSprites.explosionSpriteSheet] = explosionSpriteSheet;
  };

  /** MARK: IWrongWayRacerControllerDelegate */
  public onTimerUpdated = (payload: TimerUpdatedSocketPayload) => {};

  public onPlayersUpdated = (payload: PlayersUpdatedSocketPayload) => {};

  public onCarsUpdated = (payload: CarsUpdatedSocketPayload) => {};

  public onGameFinished = (payload: GameFinishedSocketPayload) => {};

  public onPlayerExploded = (payload: PlayerExplodedSocketPayload) => {};

  public onConnectionEstablished = () => {
    this.connected = true;

    this._wrongWayRacerSocketController.startWrongWayRacerGame({ gameSpeed: 2 });
  };

  public onDisconnect = () => {
    this.connected = false;
  };
}

export { WrongWayRacerStore };
