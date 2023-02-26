import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value
    })
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

export default function PlayersComponent() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Demo>
      <List dense={dense}>
        {generate(
          <ListItem>
            <ListItemAvatar>
              <Avatar src="https://picsum.photos/64" sx={{ width: 24, height: 24 }} />
            </ListItemAvatar>
            <ListItemText primary="Single-line item" secondary={secondary ? 'Secondary text' : null} />
          </ListItem>
        )}
      </List>
    </Demo>
  );
}
