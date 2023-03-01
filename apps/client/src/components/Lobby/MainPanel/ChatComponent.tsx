import * as React from 'react';
import List, { ListProps } from '@mui/material/List';
import { useLobbyStore } from '@/context';
import { ListItem } from '@mui/material';
import ChatMessage from '@/components/Lobby/MainPanel/ChatMessage';

/**
 * Lobby chat component that displays current chat messages
 * @param className: string - css classnames
 * @param props: MUI ListProps
 */
export default function ChatComponent({ className, ...props }: ListProps) {
  const { lobbyData } = useLobbyStore();

  return (
    <List
      dense={true}
      sx={{ overflow: 'auto' }}
      className={`${className} border-slate-400 bg-black/50 border-2 rounded-xl h-48`}
      {...props}
    >
      {lobbyData.chat.map((message) => (
        <ListItem className="py-1" key={message.id}>
          <ChatMessage message={message} />
        </ListItem>
      ))}
    </List>
  );
}
