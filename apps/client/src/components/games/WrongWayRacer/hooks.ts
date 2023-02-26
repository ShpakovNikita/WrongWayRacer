import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import * as PIXI from 'pixi.js';
import { useWrongWayRacerStore } from '@/context/WrongWayRacer';
import { lerp } from '@/utils/math';
import { useReducer, useRef } from 'react';
import { useTick } from '@pixi/react';

export type RoadParamsResult = {
  roadHeight: number;
  roadCenter: number;
  baseRoadHeight: number;
  roadScaleY: number;
};

/**
 * Get road params react hook
 * @param width: Viewport width
 * @param height: Viewport height
 * @param distance: Distance to camera
 */
export const useRoadParams = (width: number, height: number, distance: number): RoadParamsResult => {
  const { resources } = useWrongWayRacerStore();

  const imageTexture = resources[WrongWayRacerSprites.road] as PIXI.BaseTexture;
  let aspectRatio = width / imageTexture.width;

  const roadScaleY = 0.7 + height / width;
  const roadHeight = imageTexture.height * aspectRatio * roadScaleY - 50;

  return {
    roadHeight,
    baseRoadHeight: roadHeight / roadScaleY,
    roadScaleY,
    // slight offset based on a distance on the road, because road is not completely straight
    roadCenter: width / 2 - lerp(0, 200 * aspectRatio, distance)
  };
};

type CarMotion = {
  y: number;
};

const reducer = (_: CarMotion, { data }: { data: CarMotion }) => data;

export const useCarEngineMotion = ({ height }: { height: number }): CarMotion => {
  const [motion, update] = useReducer(reducer, { y: 0 });
  const iter = useRef(0);

  useTick((delta) => {
    const i = (iter.current += 0.35 * delta);
    update({
      data: {
        y: (Math.sin(i) * height) / 300
      }
    });
  });

  return motion;
};
