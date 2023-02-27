import { HTMLAttributes } from 'react';
import { Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react-lite';
import { useLobbyStore } from '@/context';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const CenterColumn = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { startGame, loading, inArena, connected } = useLobbyStore();

  return (
    <Grid item xs={6}>
      <Button variant="contained" disabled={!connected || inArena} onClick={startGame}>
        Start Racing!
      </Button>
      <Item>xs=6</Item>
    </Grid>
  );
};

export default observer(CenterColumn);
