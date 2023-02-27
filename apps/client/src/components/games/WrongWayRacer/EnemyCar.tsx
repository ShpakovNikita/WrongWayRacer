import { observer } from 'mobx-react-lite';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import FullWidthSprite from '@/components/games/WrongWayRacer/FullWidthSprite';
import { useCarEngineMotion, useRoadParams } from '@/components/games/WrongWayRacer/hooks';
import { lerp } from '@/utils/math';

const roadToParams = (road: number, carWidth: number) => {
  switch (road) {
    case 0:
      return {
        image: WrongWayRacerSprites.enemyRight,
        stride: -carWidth
      };
    case 1:
      return { image: WrongWayRacerSprites.enemyCenter, stride: 0 };
    case 2:
      return { image: WrongWayRacerSprites.enemyLeft, stride: carWidth };
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
  const { roadHeight, roadCenter } = useRoadParams(width, height, distance);

  const motion = useCarEngineMotion({ height });

  const carWidth = (width / 3) * lerp(0.2, 1, 1 - distance);

  const { image, stride } = roadToParams(road, carWidth);

  const carPositionY = height + motion.y - lerp(0, roadHeight, distance);

  return (
    <>
      <FullWidthSprite
        image={image}
        anchor={[0.5, 0.5]}
        x={roadCenter - stride}
        y={carPositionY}
        width={carWidth}
      />
    </>
  );
};

export default observer(EnemyCar);
