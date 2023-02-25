import { observer } from 'mobx-react-lite';
import { Stage, Container, AnimatedSprite, _ReactPixi } from '@pixi/react';
import { useEffect, useRef } from 'react';
import { useWrongWayRacerStore } from '@/context/WrongWayRacer';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import { useResize } from '@/utils/useResize';

const WrongWayRacer = ({ options, ...props }: _ReactPixi.IStage) => {
  const { activateStore, deactivateStore, resources } = useWrongWayRacerStore();
  const canvasRef = useRef<Stage>(null);
  const { width, height } = useResize();

  useEffect(() => {
    activateStore().then();

    return () => {
      deactivateStore().then();
    };
  }, []);

  return (
    <Stage {...props} ref={canvasRef} options={{ backgroundAlpha: 1, backgroundColor: '#fff', ...options }}>
      <Container>
        {resources[WrongWayRacerSprites.explosionSpriteSheet] && (
          <AnimatedSprite
            textures={resources[WrongWayRacerSprites.explosionSpriteSheet].animations.explosion}
            isPlaying={true}
            initialFrame={0}
            animationSpeed={0.8}
            scale={{ x: 0.5, y: 0.5 }}
            anchor={0.5}
            x={300}
            y={150}
          />
        )}
      </Container>
    </Stage>
  );
};

export default observer(WrongWayRacer);
