import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { Player } from '@/context/Lobby/Lobby.data';

/**
 * React component, that displays Player avatar and username
 * @param className: string - css classnames
 * @param player: Player - passed player info
 * @param props: MUI ListItemProps
 */
const PlayerComponent = ({ className, player, ...props }: ListItemProps & { player: Player }) => {
  return (
    <ListItem alignItems="center" {...props}>
      <ListItemAvatar sx={{ minWidth: 0, pr: 1 }}>
        <Avatar src={player.avatarSrc} sx={{ width: 24, height: 24, p: 0 }} />
      </ListItemAvatar>
      <ListItemText primary={player.username} />
    </ListItem>
  );
};

export default PlayerComponent;
