import Road from '@/components/games/WrongWayRacer/Road';
import Sky from '@/components/games/WrongWayRacer/Sky';
import EnemyCars from '@/components/games/WrongWayRacer/EnemyCars';
import PlayerExplosion from '@/components/games/WrongWayRacer/PlayerExplosion';
import PlayerCar from '@/components/games/WrongWayRacer/PlayerCar';
import GameTimer from '@/components/games/WrongWayRacer/GameTimer';
import SideRoadDecorations from '@/components/games/WrongWayRacer/SideRoadDecorations';
import Fog from '@/components/games/WrongWayRacer/Fog';
import { Container } from '@pixi/react';

const WrongWayRacerScene = ({ width, height }: { width: number; height: number }) => {
  return (
    <>
      <Sky width={width} height={height} />
      <Road width={width} height={height} />
      <SideRoadDecorations width={width} height={height} />
      <Container sortableChildren={true}>
        <EnemyCars width={width} height={height} />
        <Fog width={width} height={height} />
        <PlayerCar width={width} height={height} />
      </Container>
      <PlayerExplosion width={width} height={height} />
      <GameTimer width={width} height={height} />
    </>
  );
};

export default WrongWayRacerScene;
