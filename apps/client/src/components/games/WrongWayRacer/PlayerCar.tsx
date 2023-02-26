import { observer } from 'mobx-react-lite';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import { useWrongWayRacerStore } from '@/context/WrongWayRacer';
import * as PIXI from 'pixi.js';
import FullWidthSprite from '@/components/games/WrongWayRacer/FullWidthSprite';
import { useCarEngineMotion } from '@/components/games/WrongWayRacer/hooks';

const PlayerCar = ({ width, height }: { width: number; height: number }) => {
  const { resources } = useWrongWayRacerStore();
  const motion = useCarEngineMotion({ height });

  const carWidth = width / 6;

  const carTexture = resources[WrongWayRacerSprites.carCenter] as PIXI.BaseTexture;
  let carAspectRatio = carWidth / carTexture.width;
  const carHeight = carTexture.height * carAspectRatio;
  const carPaddingFromBottom = height / 24;

  const carPositionY = height - carHeight - carPaddingFromBottom + motion.y;

  return (
    <>
      <FullWidthSprite
        image={WrongWayRacerSprites.carRight}
        anchor={[0.5, 0]}
        x={width / 2 - carWidth}
        y={carPositionY}
        width={carWidth}
      />
      <FullWidthSprite
        image={WrongWayRacerSprites.carCenter}
        anchor={[0.5, 0]}
        x={width / 2}
        y={carPositionY}
        width={carWidth}
      />
      <FullWidthSprite
        image={WrongWayRacerSprites.carLeft}
        anchor={[0.5, 0]}
        x={width / 2 + carWidth}
        y={carPositionY}
        width={carWidth}
      />
    </>
  );
};

export default observer(PlayerCar);
