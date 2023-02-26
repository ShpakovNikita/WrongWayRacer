import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import {
  explosionSpriteSheetAtlasData,
  WrongWayRacerSprites
} from '@/context/WrongWayRacer/WrongWayRacer.resources';
import * as PIXI from 'pixi.js';
import { sleep } from '@/utils/sleep';

// there is no window object on the server
enableStaticRendering(typeof window === 'undefined');

export default class WrongWayRacerStore {
  private _loading = true;

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
  }

  public get loading() {
    return this._loading;
  }

  public set loading(value: boolean) {
    this._loading = value;
  }

  public activateStore = async () => {
    this.loading = true;

    await this.precacheSceneTextures();

    this.loading = false;
  };

  public deactivateStore = async () => {
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
}

export { WrongWayRacerStore };
