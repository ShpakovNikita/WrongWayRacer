import * as React from 'react';
import { useLobbyStore } from '@/context';
import { Box, Divider } from '@mui/material';
import LadderRow from '@/components/Lobby/LadderBoard/LadderRow';
import PersonalLadderRow from '@/components/Lobby/LadderBoard/PersonalLadderRow';

export default function LadderBoard() {
  const { lobbyData } = useLobbyStore();

  return (
    <Box className="shadow-inner-glow rounded-xl">
      <PersonalLadderRow ladder={lobbyData.ladder} className="rounded-t-xl" />
      <Box>
        {lobbyData.ladder.top.map((ladder) => (
          <>
            <Divider className="bg-gray-700" />
            <LadderRow ladder={ladder} />
          </>
        ))}
      </Box>
    </Box>
  );
}
