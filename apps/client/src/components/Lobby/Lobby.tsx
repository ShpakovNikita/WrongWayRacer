import { HTMLAttributes } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CenterColumn from '@/components/Lobby/MainPanel/MainPanel';
import { useLobbyStore } from '@/context';
import { useEffectOnce } from '@/utils/useEffectOnce';
import { observer } from 'mobx-react-lite';
import LadderBoard from '@/components/Lobby/LadderBoard/LadderBoard';
import PlayerRoomBoard from '@/components/Lobby/PlayersRoomBoard/PlayerRoomBoard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const Lobby = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { activateStore, deactivateStore } = useLobbyStore();

  useEffectOnce(() => {
    activateStore().then();
    return () => {
      deactivateStore().then();
    };
  });

  return (
    <Grid container spacing={3} className={`${className}`}>
      <Grid item xs={3.5}>
        <LadderBoard />
      </Grid>
      <Grid item xs={5}>
        <CenterColumn />
      </Grid>
      <Grid item xs={3.5}>
        <PlayerRoomBoard />
      </Grid>
    </Grid>
  );
};

export default observer(Lobby);
