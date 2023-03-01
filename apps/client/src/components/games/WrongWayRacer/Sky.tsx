import { observer } from 'mobx-react-lite';
import { Sprite } from '@pixi/react';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import { useWrongWayRacerStore } from '@/context/WrongWayRacer';
import * as PIXI from 'pixi.js';

/**
 * React PIXI js Sky Component for Wrong Way Racer scene
 * @param width: number - current viewport width
 * @param height: number - current viewport height
 */
const Sky = ({ width, height }: { width: number; height: number }) => {
  const { resources } = useWrongWayRacerStore();
  const skyTexture = resources[WrongWayRacerSprites.sky] as PIXI.BaseTexture;

  let aspectRatio = Math.max(width, height) / Math.max(skyTexture.width, skyTexture.height);

  if (skyTexture.height * aspectRatio < height) {
    aspectRatio = Math.max(width, height) / Math.min(skyTexture.width, skyTexture.height);
  }

  return (
    <Sprite image={WrongWayRacerSprites.sky} scale={aspectRatio} anchor={0.5} x={width / 2} y={height / 2} />
  );
};

export default observer(Sky);
