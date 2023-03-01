import { useWrongWayRacerStore } from '@/context/WrongWayRacer';
import { observer } from 'mobx-react-lite';
import { BitmapText, Container, withFilters } from '@pixi/react';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

const Filters = withFilters(Container, {
  shadow: DropShadowFilter
});

/**
 * React PIXI js Game Timer Component for Wrong Way Racer scene
 * @param width: number - current viewport width
 */
const GameTimer = ({ width }: { width: number }) => {
  const { globalTimer } = useWrongWayRacerStore();
  const date = new Date(0);
  date.setMilliseconds(globalTimer * 1000); // specify value for SECONDS here
  const timerString = date.toISOString().slice(14, 22);

  return (
    <Filters
      shadow={{
        distance: 2.0,
        color: 0x000000,
        shadowOnly: false,
        resolution: 3
      }}
    >
      <BitmapText
        anchor={0.5}
        x={width / 2}
        y={20}
        text={timerString}
        style={{ fontName: 'Saira-Regular', align: 'center', fontSize: 35, tint: 0xffffff }}
      />
    </Filters>
  );
};

export default observer(GameTimer);
