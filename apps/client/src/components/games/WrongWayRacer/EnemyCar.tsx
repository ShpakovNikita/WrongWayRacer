import { observer } from 'mobx-react-lite';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import FullWidthSprite from '@/components/games/WrongWayRacer/FullWidthSprite';
import { useCarEngineMotion, useRoadParams } from '@/components/games/WrongWayRacer/hooks';
import { lerp } from '@/utils/math';
import * as PIXI from 'pixi.js';
import { useWrongWayRacerStore } from '@/context';

type EnemyCarParams = {
  offsetX: number;
  objectWidth: number;
  positionY: number;
};

const getEnemyCarParams = ({
  height,
  width,
  roadHeight,
  distance,
  carHeight
}: {
  height: number;
  width: number;
  roadHeight: number;
  distance: number;
  carHeight: number;
}): EnemyCarParams => {
  const farPositionY = height - roadHeight;
  const closePositionY = height - carHeight;
  const positionY = lerp(closePositionY, farPositionY, distance);

  const farWidth = width / 40;
  const closeWidth = width / 6;
  const objectWidth = lerp(closeWidth, farWidth, distance);

  const farOffsetX = width / 20;
  const closeOffsetX = width / 1.7;
  const offsetX = lerp(closeOffsetX, farOffsetX, distance);

  return {
    offsetX,
    objectWidth,
    positionY
  };
};

const roadToParams = (road: number, carWidth: number) => {
  switch (road) {
    case 0:
      return {
        image: WrongWayRacerSprites.enemyLeft,
        stride: -carWidth
      };
    case 1:
      return { image: WrongWayRacerSprites.enemyCenter, stride: 0 };
    case 2:
      return { image: WrongWayRacerSprites.enemyRight, stride: +carWidth };
    default:
      return { stride: 100, image: WrongWayRacerSprites.enemyCenter };
  }
};

/**
 * Enemy Car PIXI.Js render component
 * @param width: Viewport's width
 * @param height: Viewport's height
 * @param road: Current road, from left to right's
 * @param distance: Distance between 0 and 1, with 0 is closest to camera
 */
const EnemyCar = ({
  width,
  height,
  road,
  distance
}: {
  width: number;
  height: number;
  road: number;
  distance: number;
}) => {
  const distanceAmplified = -Math.pow(distance - 1, 2) + 1;
  const { resources } = useWrongWayRacerStore();
  const { roadHeight, roadCenter } = useRoadParams(width, height, distanceAmplified);
  const motion = useCarEngineMotion({ height });

  const carWidth = width / 6;

  const carTexture = resources[WrongWayRacerSprites.carCenter] as PIXI.BaseTexture;
  let carAspectRatio = carWidth / carTexture.width;
  const carHeight = carTexture.height * carAspectRatio;

  const carParams = getEnemyCarParams({ height, width, roadHeight, carHeight, distance: distanceAmplified });
  const { stride, image } = roadToParams(road, carParams.objectWidth);

  return (
    <>
      <FullWidthSprite
        image={image}
        width={carParams.objectWidth}
        anchor={[0.5, 0]}
        x={roadCenter + stride}
        y={carParams.positionY + motion.y * (1 - distance)}
        zIndex={-distance}
      />
    </>
  );
};

export default observer(EnemyCar);
