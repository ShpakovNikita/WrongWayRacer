import { HTMLAttributes } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PlayersComponent from '@/components/Lobby/PlayersComponent';
import CenterColumn from '@/components/Lobby/CenterColumn';
import { useLobbyStore } from '@/context';
import { useEffectOnce } from '@/utils/useEffectOnce';
import { observer } from 'mobx-react-lite';

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
      <Grid item xs>
        <Item>xs</Item>
      </Grid>
      <CenterColumn />
      <Grid item xs>
        <PlayersComponent />
      </Grid>
    </Grid>
  );
};

export default observer(Lobby);
