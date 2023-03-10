import { observer } from 'mobx-react-lite';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import { useRoadParams } from '@/components/games/WrongWayRacer/hooks';
import { AnimatedSprite } from '@pixi/react';
import { useWrongWayRacerStore } from '@/context/WrongWayRacer';
import * as PIXI from 'pixi.js';

const getExplosionOffset = (playerRoad: number, carWidth: number) => {
  return playerRoad === 0 ? -carWidth : playerRoad === 2 ? carWidth : 0;
};

/**
 * React PIXI js Player Explosion Component for Wrong Way Racer scene, displaying explosion animation once
 * @param width: number - current viewport width
 * @param height: number - current viewport height
 */
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
          anchor={[0.5, 0.4]}
          x={roadCenter + 50 + getExplosionOffset(playerRoad, carWidth)}
          y={height - roadHeight}
          onLoop={() => {
            wrongWayRacerStore.playerExplodeAnimationPlaying = false;
          }}
        />
      )}
    </>
  );
};

export default observer(PlayerExplosion);
