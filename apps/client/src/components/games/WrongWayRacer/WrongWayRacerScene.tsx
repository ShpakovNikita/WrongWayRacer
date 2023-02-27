import Road from '@/components/games/WrongWayRacer/Road';
import Sky from '@/components/games/WrongWayRacer/Sky';
import EnemyCars from '@/components/games/WrongWayRacer/EnemyCars';
import PlayerExplosion from '@/components/games/WrongWayRacer/PlayerExplosion';
import PlayerCar from '@/components/games/WrongWayRacer/PlayerCar';

const WrongWayRacerScene = ({ width, height }: { width: number; height: number }) => {
  return (
    <>
      <Sky width={width} height={height} />
      <Road width={width} height={height} />
      <PlayerCar width={width} height={height} />
      <EnemyCars width={width} height={height} />
      <PlayerExplosion width={width} height={height} />
    </>
  );
};

export default WrongWayRacerScene;
