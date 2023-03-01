import * as React from 'react';
import { Box, BoxProps, List, Typography } from '@mui/material';
import { useLobbyStore } from '@/context';
import PlayerComponent from '@/components/Lobby/PlayersRoomBoard/PlayerComponent';
import { PrimaryButton } from '@/components/ui';
import SettingsIcon from '@mui/icons-material/Settings';

/**
 * React component for displaying current player room info, like players list, room maximum capacity
 * @param className: string - css classnames
 * @param props: MUI BoxProps
 */
export default function PlayerRoomBoard({ className, ...props }: BoxProps) {
  const { lobbyData } = useLobbyStore();

  return (
    <Box className={`${className} shadow-inner-glow rounded-xl`} {...props}>
      <Box className="flex flex-row rounded-t-xl justify-between items-center px-2 bg-black/20">
        <Typography variant="subtitle1" fontWeight="bold">
          Players
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {lobbyData.players.length}/{lobbyData.roomSize}
        </Typography>
      </Box>
      <Box className="p-2">
        <PrimaryButton className="w-full flex items-center justify-center" size="sm">
          <SettingsIcon sx={{ fontSize: 'medium', mr: 0.5 }} />
          Setting
        </PrimaryButton>
        <List dense sx={{ overflow: 'auto' }} className="h-44">
          {lobbyData.players.map((player) => (
            <PlayerComponent player={player} key={player.username} />
          ))}
        </List>
      </Box>
    </Box>
  );
}
