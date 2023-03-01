import { Grid, GridProps } from '@mui/material';
import CenterColumn from '@/components/Lobby/MainPanel/MainPanel';
import { useLobbyStore } from '@/context';
import { useEffectOnce } from '@/utils/useEffectOnce';
import { observer } from 'mobx-react-lite';
import LadderBoard from '@/components/Lobby/LadderBoard/LadderBoard';
import PlayerRoomBoard from '@/components/Lobby/PlayersRoomBoard/PlayerRoomBoard';

/**
 * Lobby control panel with general lobby info and controls
 * @param props: MUI GridProps
 */
const Lobby = (props: GridProps) => {
  const { activateStore, deactivateStore } = useLobbyStore();

  useEffectOnce(() => {
    activateStore().then();
    return () => {
      deactivateStore().then();
    };
  });

  return (
    <Grid container spacing={3} {...props}>
      <Grid item xs={12} md={3.5}>
        <LadderBoard />
      </Grid>
      <Grid item xs={12} md={5}>
        <CenterColumn />
      </Grid>
      <Grid item xs={12} md={3.5}>
        <PlayerRoomBoard />
      </Grid>
    </Grid>
  );
};

export default observer(Lobby);
