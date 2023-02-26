import { observer } from 'mobx-react-lite';
import { _ReactPixi, Sprite } from '@pixi/react';
import { useWrongWayRacerStore } from '@/context/WrongWayRacer';
import * as PIXI from 'pixi.js';

const FullWidthSprite = ({
  width,
  image,
  scale,
  ...props
}: Omit<_ReactPixi.ISprite, 'width' | 'scale'> & {
  width: number;
  image: string;
  scale?: [number, number];
}) => {
  const { resources } = useWrongWayRacerStore();
  const imageTexture = resources[image] as PIXI.BaseTexture;

  let aspectRatio = width / imageTexture.width;

  return (
    <Sprite
      {...props}
      image={image}
      scale={scale ? [scale[0] * aspectRatio, scale[1] * aspectRatio] : aspectRatio}
    />
  );
};

export default observer(FullWidthSprite);
