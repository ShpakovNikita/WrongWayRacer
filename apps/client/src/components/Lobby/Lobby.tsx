import { HTMLAttributes } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PlayersComponent from '@/components/Lobby/PlayersComponent';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const Lobby = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Grid container spacing={3} className={`${className}`}>
      <Grid item xs>
        <Item>xs</Item>
      </Grid>
      <Grid item xs={6}>
        <Item>xs=6</Item>
      </Grid>
      <Grid item xs>
        <PlayersComponent />
      </Grid>
    </Grid>
  );
};

export default Lobby;
