import { HTMLAttributes } from 'react';
import * as React from 'react';
import { LadderPlace, Player } from '@/context/Lobby/Lobby.data';
import { getMinutesAndSecondsTime, nthFormat } from '@/utils/string';
import { Box, Typography } from '@mui/material';

const LadderRow = ({
  className,
  ladder,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ladder: LadderPlace }) => {
  return (
    <Box className="flex flex-row py-0 px-3 items-center">
      <Typography variant="subtitle2" className="w-full">
        {ladder.player.username}
      </Typography>
      <Box className="bg-purple-900/50 flex flex-col w-16 py-0.5 items-center">
        <Typography variant="subtitle3">Record</Typography>
        <Typography variant="subtitle2">{getMinutesAndSecondsTime(ladder.time)}</Typography>
      </Box>
      <Box className="flex flex-col w-12 items-center">
        <Typography variant="subtitle3">Rank</Typography>
        <Typography variant="subtitle2">
          {ladder.rank}
          {nthFormat(ladder.rank)}
        </Typography>
      </Box>
    </Box>
  );
};

export default LadderRow;
