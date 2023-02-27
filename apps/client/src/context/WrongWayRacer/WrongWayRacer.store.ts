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
  WrongWayRacerSocketController
} from '@/api/socket/WrongWayRacer.controller';
import { Car, getWrongWayRacerConfig, WrongWayRacerGameLogic } from '@splash/wrong-way-racer';
import {
  IWrongWayRacerInputDelegate,
  WrongWayRacerInputController
} from '@/context/WrongWayRacer/WrongWayRacer.input';

// there is no window object on the server
enableStaticRendering(typeof window === 'undefined');

const gameSpeed = 2;

export default class WrongWayRacerStore
  implements IWrongWayRacerControllerDelegate, IWrongWayRacerInputDelegate
{
  private _loading = true;
  private _connected = false;

  private _playerExplodeAnimationPlaying = false;
  private _playerRoad = 1;
  private _globalTimer = 0;
  private _cars: Car[] = [];

  private _wrongWayRacerSocketController: WrongWayRacerSocketController;
  private _wrongWayRacerInputController: WrongWayRacerInputController;
  private _wrongWayRacerGameLogic: WrongWayRacerGameLogic;

  private _lastUpdate = 0;
  private _loopInterval = 0;
  private readonly _playerId: string;

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
    this._playerId = socket.id;
    this._wrongWayRacerSocketController = new WrongWayRacerSocketController(this, socket);
    this._wrongWayRacerInputController = new WrongWayRacerInputController(this);
    this._wrongWayRacerGameLogic = new WrongWayRacerGameLogic(getWrongWayRacerConfig(gameSpeed, false));
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

  public get globalTimer() {
    return this._globalTimer;
  }

  private set globalTimer(value: number) {
    this._globalTimer = value;
  }

  public get cars() {
    return this._cars;
  }

  private set cars(value: Car[]) {
    this._cars = value;
  }

  public get playerRoad() {
    return this._playerRoad;
  }

  private set playerRoad(value: number) {
    this._playerRoad = value;
  }

  public get playerExplodeAnimationPlaying() {
    return this._playerExplodeAnimationPlaying;
  }

  public set playerExplodeAnimationPlaying(value: boolean) {
    this._playerExplodeAnimationPlaying = value;
  }

  public activateStore = async () => {
    this.loading = true;

    await this.precacheSceneTextures();
    this._wrongWayRacerSocketController.activate();
    this._wrongWayRacerInputController.activate();

    this.loading = false;
  };

  public deactivateStore = async () => {
    this._wrongWayRacerInputController.deactivate();
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

  private finishGame = async () => {
    clearInterval(this._loopInterval);
  };

  private startGame = async () => {
    await this._wrongWayRacerSocketController.startWrongWayRacerGame({ gameSpeed });
    this._wrongWayRacerGameLogic.startGame();

    this._lastUpdate = Date.now();
    this._loopInterval = window.setInterval(this.gameLoop, 1000 / 60);
  };

  private gameLoop = async () => {
    const now = Date.now();
    const dt = now - this._lastUpdate;
    this._lastUpdate = now;

    this._wrongWayRacerGameLogic.gameLoop(dt / 1000);
    this.syncSceneWithUI();
  };

  /** TODO: It's better to think about some kind of micro framework for syncing client with backend.
   * Something like wrappers around replicated properties, that indicates that some socket event should be fired on it's
   * change, and if we are on client, we subscribed on this change to automatically sync it's with the backend along
   * with the same client-side logic for smoother game experience */

  private syncSceneWithUI = () => {
    this.globalTimer = this._wrongWayRacerGameLogic.globalTime;
    this.cars = this._wrongWayRacerGameLogic.cars;
  };

  /** MARK: IWrongWayRacerControllerDelegate */
  public onTimerUpdated = ({ gameTime }: TimerUpdatedSocketPayload) => {
    this._wrongWayRacerGameLogic.globalTime = gameTime;
  };

  public onPlayersUpdated = ({ players }: PlayersUpdatedSocketPayload) => {
    const player = players.find((p) => p.id === this._playerId);
    if (player) {
      this.playerRoad = player.road;
    }
  };

  public onCarsUpdated = ({ cars }: CarsUpdatedSocketPayload) => {
    this._wrongWayRacerGameLogic.cars = cars;
  };

  public onGameFinished = async (payload: GameFinishedSocketPayload) => {
    await this.finishGame();
  };

  public onPlayerExploded = (payload: PlayerExplodedSocketPayload) => {
    this.playerExplodeAnimationPlaying = false;
  };

  public onConnectionEstablished = async () => {
    this.connected = true;
    await this.startGame();
  };

  public onDisconnect = () => {
    this.connected = false;
  };

  /** MARK: IWrongWayRacerInputDelegate */
  public onLeftPressed = () => {
    this._wrongWayRacerSocketController.leftPressed();
  };

  public onRightPressed = () => {
    this._wrongWayRacerSocketController.rightPressed();
  };
}

export { WrongWayRacerStore };
