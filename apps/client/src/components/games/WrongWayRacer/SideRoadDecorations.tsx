import { observer } from 'mobx-react-lite';
import FullWidthSprite from '@/components/games/WrongWayRacer/FullWidthSprite';
import { useRoadParams } from '@/components/games/WrongWayRacer/hooks';
import { lerp } from '@/utils/math';
import { useWrongWayRacerStore } from '@/context';
import { WrongWayRacerSprites } from '@/context/WrongWayRacer/WrongWayRacer.resources';

type DecorationParams = {
  offsetX: number;
  objectWidth: number;
  positionY: number;
};

const getDecorationParams = ({
  height,
  width,
  roadHeight,
  distance
}: {
  height: number;
  width: number;
  roadHeight: number;
  distance: number;
}): DecorationParams => {
  const farPositionY = height - roadHeight;
  const closePositionY = height - roadHeight / 3;
  const positionY = lerp(closePositionY, farPositionY, distance);

  const farWidth = width / 40;
  const closeWidth = width / 2;
  const objectWidth = lerp(closeWidth, farWidth, distance);

  const farOffsetX = width / 20;
  const closeOffsetX = width / 1.7;
  const offsetX = lerp(closeOffsetX, farOffsetX, distance);

  return {
    offsetX,
    objectWidth,
    positionY
  };
};

/**
 * Enemy Car PIXI.Js render component
 * @param width: Viewport's width
 * @param height: Viewport's height
 * @param road: Current road, from left to right's
 * @param distance: Distance between 0 and 1, with 0 is closest to camera
 */
const SideRoadDecorations = ({ width, height }: { width: number; height: number }) => {
  const { globalTimer } = useWrongWayRacerStore();
  const roadDistance = ((globalTimer + 5) % 10) / 10;
  const mountainDistance = (globalTimer % 10) / 10;
  const roadDistanceAmplified = 1 - Math.pow(roadDistance, 2.5);
  const mountainDistanceAmplified = 1 - Math.pow(mountainDistance, 2.5);

  const { roadHeight, roadCenter } = useRoadParams(width, height, roadDistance);
  const { roadCenter: mountainCenter } = useRoadParams(width, height, mountainDistance);

  const roadParams = getDecorationParams({ width, height, roadHeight, distance: roadDistanceAmplified });
  const mountainParams = getDecorationParams({
    width,
    height,
    roadHeight,
    distance: mountainDistanceAmplified
  });

  return (
    <>
      <FullWidthSprite
        image={WrongWayRacerSprites.mountainLeft}
        anchor={[1, 0.4]}
        x={mountainCenter - mountainParams.offsetX * 1.5}
        y={mountainParams.positionY}
        width={mountainParams.objectWidth * 1.5}
        alpha={mountainDistance * 10 * (1 - mountainDistance)}
      />
      <FullWidthSprite
        image={WrongWayRacerSprites.sideRoadLeft}
        anchor={[0.5, 0.4]}
        x={roadCenter - roadParams.offsetX}
        y={roadParams.positionY}
        width={roadParams.objectWidth}
        alpha={roadDistance * 10 * (1 - roadDistance)}
      />
      <FullWidthSprite
        image={WrongWayRacerSprites.mountainRight}
        anchor={[0, 0.4]}
        x={mountainCenter + mountainParams.offsetX * 1.5}
        y={mountainParams.positionY}
        width={mountainParams.objectWidth * 1.5}
        alpha={mountainDistance * 10 * (1 - mountainDistance)}
      />
      <FullWidthSprite
        image={WrongWayRacerSprites.sideRoadRight}
        anchor={[0.5, 0.4]}
        x={roadCenter + roadParams.offsetX}
        y={roadParams.positionY}
        width={roadParams.objectWidth}
        alpha={roadDistance * 10 * (1 - roadDistance)}
      />
    </>
  );
};

export default observer(SideRoadDecorations);
