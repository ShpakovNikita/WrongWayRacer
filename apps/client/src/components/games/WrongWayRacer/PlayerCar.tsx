import { observer } from 'mobx-react-lite';
import { useTick } from '@pixi/react';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import { useWrongWayRacerStore } from '@/context/WrongWayRacer';
import * as PIXI from 'pixi.js';
import FullWidthSprite from '@/components/games/WrongWayRacer/FullWidthSprite';
import { useReducer, useRef } from 'react';

type CarMotion = {
  x: number;
};

const reducer = (_: CarMotion, { data }: { data: CarMotion }) => data;

const PlayerCar = ({ width, height }: { width: number; height: number }) => {
  const { resources } = useWrongWayRacerStore();
  const [motion, update] = useReducer(reducer, { x: 0 });
  const iter = useRef(0);

  const carWidth = width / 6;

  const carTexture = resources[WrongWayRacerSprites.carCenter] as PIXI.BaseTexture;
  let carAspectRatio = carWidth / carTexture.width;
  const carHeight = carTexture.height * carAspectRatio;
  const carPaddingFromBottom = height / 24;

  useTick((delta) => {
    const i = (iter.current += 0.35 * delta);
    update({
      data: {
        x: (Math.sin(i) * height) / 300
      }
    });
  });

  const carPositionY = height - carHeight - carPaddingFromBottom + motion.x;

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
