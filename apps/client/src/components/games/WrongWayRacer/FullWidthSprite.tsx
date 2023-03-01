import { observer } from 'mobx-react-lite';
import { _ReactPixi, Sprite } from '@pixi/react';
import { useWrongWayRacerStore } from '@/context/WrongWayRacer';
import * as PIXI from 'pixi.js';

/**
 * React PIXI js Component for scaling whole sprite proportionally to width
 * @param width: number - current viewport width
 * @param image: string - image file path in cache and public assets folder (or any URL)
 * @param scale?: [number, number] - scale sprite additionally
 * @param props: _ReactPixi.ISprite Props
 */
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
