import { observer } from 'mobx-react-lite';
import { Container, AnimatedSprite, Sprite } from '@pixi/react';
import { useWrongWayRacerStore } from '@/context/WrongWayRacer';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import * as PIXI from 'pixi.js';
import Road from '@/components/games/WrongWayRacer/Road';
import Sky from '@/components/games/WrongWayRacer/Sky';
import PlayerCar from '@/components/games/WrongWayRacer/PlayerCar';

const WrongWayRacerScene = ({ width, height }: { width: number; height: number }) => {
  const { resources } = useWrongWayRacerStore();

  return (
    <>
      <AnimatedSprite
        textures={
          (resources[WrongWayRacerSprites.explosionSpriteSheet] as PIXI.Spritesheet).animations.explosion
        }
        isPlaying={true}
        initialFrame={0}
        animationSpeed={0.8}
        scale={{ x: 0.5, y: 0.5 }}
        anchor={0.5}
        x={300}
        y={150}
      />
      <Sky width={width} height={height} />
      <Road width={width} height={height} />
      <PlayerCar width={width} height={height} />
    </>
  );
};

export default observer(WrongWayRacerScene);
