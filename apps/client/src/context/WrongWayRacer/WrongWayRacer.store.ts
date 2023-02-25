import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import {
  explosionSpriteSheetAtlasData,
  WrongWayRacerSprites
} from '@/context/WrongWayRacer/WrongWayRacer.resources';
import * as PIXI from 'pixi.js';

// there is no window object on the server
enableStaticRendering(typeof window === 'undefined');

export default class WrongWayRacerStore {
  private _resources: any;

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
  }

  public activateStore = async () => {
    const explosionSpriteSheet = new PIXI.Spritesheet(
      PIXI.BaseTexture.from(WrongWayRacerSprites.explosionSpriteSheet),
      explosionSpriteSheetAtlasData
    );
    await explosionSpriteSheet.parse();
    this._resources[WrongWayRacerSprites.explosionSpriteSheet] = explosionSpriteSheet;
  };

  public deactivateStore = async () => {};

  public get resources() {
    return this._resources;
  }
}

export { WrongWayRacerStore };
