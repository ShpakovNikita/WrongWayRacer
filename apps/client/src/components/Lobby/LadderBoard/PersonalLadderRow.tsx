import * as React from 'react';
import { Ladder } from '@/context/Lobby/Lobby.data';
import { formattedCounter, getMinutesAndSecondsTime, nthFormat } from '@/utils/string';
import { Box, BoxProps, Typography } from '@mui/material';

/**
 * Component that displays current player verbose ladder stats
 * @param className: string - css classnames
 * @param ladder: Ladder - lobby ladder info
 * @param props: MUI BoxProps
 */
const PersonalLadderRow = ({ className, ladder, ...props }: BoxProps & { ladder: Ladder }) => {
  return (
    <Box
      {...props}
      className={`${className} flex flex-row p-3 items-center justify-between bg-purple-500/50`}
    >
      <Box className="flex flex-col items-center">
        <Typography variant="h4" fontWeight="bold" className="drop-shadow-md">
          {getMinutesAndSecondsTime(ladder.my.time)}
        </Typography>
        <Typography variant="subtitle2">Your last record</Typography>
      </Box>
      <Box className="flex flex-col items-center justify-center rounded-full bg-slate-900/70 w-16 h-16">
        <Typography variant="subtitle2">
          # {ladder.my.rank}
          {nthFormat(ladder.my.rank)}
        </Typography>
        <Typography variant="subtitle3">From {formattedCounter(ladder.playersCount)}</Typography>
      </Box>
    </Box>
  );
};

export default PersonalLadderRow;
