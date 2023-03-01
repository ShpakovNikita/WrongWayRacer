import * as React from 'react';
import { ChatMessage } from '@/context/Lobby/Lobby.data';
import { Box, BoxProps, Typography } from '@mui/material';

/**
 * React component that displays passed chat message info
 * @param className: string - css classnames
 * @param message: ChatMessage - chat message info
 * @param props: MUI BoxProps
 */
const ChatMessage = ({ className, message, ...props }: BoxProps & { message: ChatMessage }) => {
  return (
    <Box className={`${className} flex flex-row items-center space-x-1`} {...props}>
      <Typography variant="subtitle2">{message.player.username}:</Typography>
      <Typography variant="body2">{message.message}</Typography>
    </Box>
  );
};

export default ChatMessage;
