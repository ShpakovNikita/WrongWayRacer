import { observer } from 'mobx-react-lite';
import { Container, Sprite } from '@pixi/react';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import { useWrongWayRacerStore } from '@/context/WrongWayRacer';
import * as PIXI from 'pixi.js';
import FullWidthSprite from '@/components/games/WrongWayRacer/FullWidthSprite';

const Road = ({ width, height }: { width: number; height: number }) => {
  const { resources } = useWrongWayRacerStore();

  const imageTexture = resources[WrongWayRacerSprites.road] as PIXI.BaseTexture;
  let aspectRatio = width / imageTexture.width;

  const roadScaleY = 0.7 + height / width;
  const roadHeight = imageTexture.height * aspectRatio * roadScaleY;

  return (
    <Container y={height - roadHeight + 50}>
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
      <FullWidthSprite image={WrongWayRacerSprites.fog} width={width} anchor={[0, 0.5]} scale={[1, 0.5]} />
    </Container>
  );
};

export default observer(Road);
