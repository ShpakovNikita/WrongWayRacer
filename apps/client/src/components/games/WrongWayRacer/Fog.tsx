import { observer } from 'mobx-react-lite';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';
import FullWidthSprite from '@/components/games/WrongWayRacer/FullWidthSprite';
import { useRoadParams } from '@/components/games/WrongWayRacer/hooks';

/**
 * React PIXI js Fog Component for Wrong Way Racer scene
 * @param width: number - current viewport width
 * @param height: number - current viewport height
 */
const Fog = ({ width, height }: { width: number; height: number }) => {
  const { roadHeight } = useRoadParams(width, height, 0);

  return (
    <FullWidthSprite
      y={height - roadHeight}
      image={WrongWayRacerSprites.fog}
      width={width}
      anchor={[0, 0.5]}
      scale={[1, 0.5]}
    />
  );
};

export default observer(Fog);
