import { ISpritesheetData } from 'pixi.js';

export enum WrongWayRacerSprites {
  // Player car
  carRight = '/assets/games/wrong-way-racer/car_right.png',
  carLeft = '/assets/games/wrong-way-racer/car_left.png',
  carCenter = '/assets/games/wrong-way-racer/car_center.png',

  // Enemy car
  enemyRight = '/assets/games/wrong-way-racer/enemy_right.png',
  enemyLeft = '/assets/games/wrong-way-racer/enemy_left.png',
  enemyCenter = '/assets/games/wrong-way-racer/enemy_center.png',

  // Mountain
  mountainFade = '/assets/games/wrong-way-racer/mountain_fade.png',
  mountainLeft = '/assets/games/wrong-way-racer/mountain_left.png',
  mountainRight = '/assets/games/wrong-way-racer/mountain_right.png',

  // Road
  road = '/assets/games/wrong-way-racer/road.png',
  sideRoadLeft = '/assets/games/wrong-way-racer/sideroad_left.png',
  sideRoadRight = '/assets/games/wrong-way-racer/sideroad_right.png',

  // Other
  sky = '/assets/games/wrong-way-racer/sky.png',
  fog = '/assets/games/wrong-way-racer/fog.png',
  explosionSpriteSheet = '/assets/games/wrong-way-racer/explosion_spritesheet.avif'
}

const getSpriteFrames = (w: number, h: number, frame_w: number, frame_h: number, count: number) => {
  let frame = 0;
  const frames: any = {};

  for (let i = 0; i < h / frame_h; ++i) {
    for (let j = 0; j < w / frame_w; ++j) {
      frames[`frame${frame}`] = {
        frame: { x: j * frame_w, y: i * frame_h, w: frame_w, h: frame_h },
        sourceSize: { w: frame_w, h: frame_h },
        spriteSourceSize: { x: 0, y: 0, w: frame_w, h: frame_h }
      };

      frame += 1;
      if (frame >= count) {
        return frames;
      }
    }
  }

  return frames;
};

export const explosionSpriteSheetAtlasData: ISpritesheetData = {
  frames: {
    ...getSpriteFrames(6720, 3245, 1120, 649, 28)
  },
  meta: {
    scale: '1'
  },
  animations: {
    explosion: [...Array(28).keys()].map((i) => `frame${i}`)
  }
};
