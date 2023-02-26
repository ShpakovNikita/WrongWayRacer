import { observer } from 'mobx-react-lite';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import FullWidthSprite from '@/components/games/WrongWayRacer/FullWidthSprite';
import { useCarEngineMotion, useRoadParams } from '@/components/games/WrongWayRacer/hooks';
import { lerp } from '@/utils/math';
import { Container } from '@pixi/react';

const EnemyCar = ({ width, height }: { width: number; height: number }) => {
  const distance = 0.4;

  const { roadHeight, roadCenter } = useRoadParams(width, height, distance);

  const motion = useCarEngineMotion({ height });

  const carWidth = (width / 3) * lerp(0.2, 1, 1 - distance);

  const carPositionY = height + motion.y - lerp(0, roadHeight, distance);

  return (
    <>
      <FullWidthSprite
        image={WrongWayRacerSprites.enemyLeft}
        anchor={[0.5, 0.5]}
        x={roadCenter - carWidth}
        y={carPositionY}
        width={carWidth}
      />
      <Container>
        <FullWidthSprite
          image={WrongWayRacerSprites.enemyCenter}
          anchor={[0.5, 0.5]}
          x={roadCenter}
          y={carPositionY}
          width={carWidth}
        />
      </Container>
      <FullWidthSprite
        image={WrongWayRacerSprites.enemyRight}
        anchor={[0.5, 0.5]}
        x={roadCenter + carWidth}
        y={carPositionY}
        width={carWidth}
      />
    </>
  );
};

export default observer(EnemyCar);
