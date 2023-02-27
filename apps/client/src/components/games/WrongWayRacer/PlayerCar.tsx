import { observer } from 'mobx-react-lite';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import { useWrongWayRacerStore } from '@/context/WrongWayRacer';
import * as PIXI from 'pixi.js';
import FullWidthSprite from '@/components/games/WrongWayRacer/FullWidthSprite';
import { useCarEngineMotion } from '@/components/games/WrongWayRacer/hooks';

const roadToParams = (road: number, carWidth: number) => {
  switch (road) {
    case 0:
      return {
        image: WrongWayRacerSprites.carRight,
        stride: -carWidth
      };
    case 1:
      return { image: WrongWayRacerSprites.carCenter, stride: 0 };
    case 2:
      return { image: WrongWayRacerSprites.carLeft, stride: carWidth };
    default:
      return { stride: 0, image: WrongWayRacerSprites.carCenter };
  }
};

const PlayerCar = ({ width, height }: { width: number; height: number }) => {
  const { resources, playerRoad } = useWrongWayRacerStore();
  const motion = useCarEngineMotion({ height });
  const carWidth = width / 6;
  const { stride, image } = roadToParams(playerRoad, carWidth);

  const carTexture = resources[WrongWayRacerSprites.carCenter] as PIXI.BaseTexture;
  let carAspectRatio = carWidth / carTexture.width;
  const carHeight = carTexture.height * carAspectRatio;

  const carPaddingFromBottom = height / 24;

  const carPositionY = height - carHeight - carPaddingFromBottom + motion.y;

  return (
    <>
      <FullWidthSprite
        image={WrongWayRacerSprites.shadow}
        width={carWidth}
        anchor={[0.5, 0.6]}
        x={width / 2 + stride}
        y={height - carPaddingFromBottom}
        alpha={0.5}
      />
      <FullWidthSprite
        image={image}
        width={carWidth}
        anchor={[0.5, 0]}
        x={width / 2 + stride}
        y={carPositionY}
      />
    </>
  );
};

export default observer(PlayerCar);
