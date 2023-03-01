import { observer } from 'mobx-react-lite';
import { Container } from '@pixi/react';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import * as PIXI from 'pixi.js';
import FullWidthSprite from '@/components/games/WrongWayRacer/FullWidthSprite';
import { useRoadParams } from '@/components/games/WrongWayRacer/hooks';

/**
 * React PIXI js Road Component for Wrong Way Racer scene
 * @param width: number - current viewport width
 * @param height: number - current viewport height
 */
const Road = ({ width, height }: { width: number; height: number }) => {
  const { roadScaleY, roadHeight } = useRoadParams(width, height, 0);

  return (
    <Container y={height - roadHeight}>
      <FullWidthSprite
        blendMode={PIXI.BLEND_MODES.XOR}
        image={WrongWayRacerSprites.mountainFade}
        width={width}
        y={-20}
        anchor={[0, 0.5]}
      />
      <FullWidthSprite
        image={WrongWayRacerSprites.road}
        width={width}
        anchor={[0.5, 0]}
        x={width / 2}
        scale={[1.3, roadScaleY]}
      />
    </Container>
  );
};

export default observer(Road);
