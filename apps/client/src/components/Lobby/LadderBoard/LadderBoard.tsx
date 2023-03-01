import * as React from 'react';
import { useLobbyStore } from '@/context';
import { Box, BoxProps, Divider } from '@mui/material';
import LadderRow from '@/components/Lobby/LadderBoard/LadderRow';
import PersonalLadderRow from '@/components/Lobby/LadderBoard/PersonalLadderRow';

/**
 * Component for displaying current player ladder score and other user's ladder rankings
 * @param className: string - css classnames
 * @param props: MUI BoxProps
 */
export default function LadderBoard({ className, ...props }: BoxProps) {
  const { lobbyData } = useLobbyStore();

  return (
    <Box className={`${className} shadow-inner-glow rounded-xl`} {...props}>
      <PersonalLadderRow ladder={lobbyData.ladder} className="rounded-t-xl" />
      <Box>
        {lobbyData.ladder.top.map((ladder) => (
          <div key={ladder.player.username}>
            <Divider className="bg-gray-700" />
            <LadderRow ladder={ladder} />
          </div>
        ))}
      </Box>
    </Box>
  );
}
