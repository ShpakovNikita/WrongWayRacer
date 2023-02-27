import { observer } from 'mobx-react-lite';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import { useRoadParams } from '@/components/games/WrongWayRacer/hooks';
import { AnimatedSprite } from '@pixi/react';
import { useWrongWayRacerStore } from '@/context/WrongWayRacer';
import * as PIXI from 'pixi.js';

const PlayerExplosion = ({ width, height }: { width: number; height: number }) => {
  const wrongWayRacerStore = useWrongWayRacerStore();
  const { resources, playerExplodeAnimationPlaying, playerRoad } = wrongWayRacerStore;

  const { roadHeight, roadCenter } = useRoadParams(width, height, 0);

  const spritesheet = resources[WrongWayRacerSprites.explosionSpriteSheet] as PIXI.Spritesheet;

  let aspectRatio = width / spritesheet.textures.frame0.width;
  const carWidth = width / 5;

  return (
    <>
      {playerExplodeAnimationPlaying && (
        <AnimatedSprite
          textures={spritesheet.animations.explosion}
          isPlaying={true}
          initialFrame={0}
          animationSpeed={0.8}
          scale={aspectRatio / 2}
          anchor={[0.5, 0.5]}
          x={roadCenter + 50 + playerRoad === 0 ? -carWidth : playerRoad === 2 ? carWidth : 0}
          y={height - roadHeight}
          onComplete={() => (wrongWayRacerStore.playerExplodeAnimationPlaying = false)}
        />
      )}
    </>
  );
};

export default observer(PlayerExplosion);
