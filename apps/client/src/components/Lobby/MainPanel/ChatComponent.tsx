import * as React from 'react';
import List from '@mui/material/List';
import { useLobbyStore } from '@/context';
import { ListItem } from '@mui/material';
import ChatMessage from '@/components/Lobby/MainPanel/ChatMessage';

export default function ChatComponent() {
  const { lobbyData } = useLobbyStore();

  return (
    <List
      dense={true}
      sx={{ maxHeight: '100vh', overflow: 'auto' }}
      className="border-slate-400 bg-black/50 border-2 rounded-xl"
    >
      {lobbyData.chat.map((message) => (
        <ListItem className="py-1">
          <ChatMessage message={message} />
        </ListItem>
      ))}
    </List>
  );
}
