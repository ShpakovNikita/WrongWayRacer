import EnemyCar from '@/components/games/WrongWayRacer/EnemyCar';
import { observer } from 'mobx-react-lite';
import { useWrongWayRacerStore } from '@/context/WrongWayRacer';

const EnemyCars = ({ width, height }: { width: number; height: number }) => {
  const { cars } = useWrongWayRacerStore();
  return (
    <>
      {cars.map((car) => (
        <EnemyCar
          width={width}
          height={height}
          key={car.id}
          road={car.position[0]}
          distance={car.position[1] / 10}
        />
      ))}
    </>
  );
};

export default observer(EnemyCars);
