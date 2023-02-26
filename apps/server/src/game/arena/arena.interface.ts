import { UserProfile } from '@splash/types';
import { Socket } from 'socket.io';

export type ArenaUser = UserProfile & {
  socket: Socket;
};

export interface IGameArena {
  arenaId: string;
  connectedUsers: ArenaUser[];

  connectUser: (connectingUser: UserProfile, socket: Socket) => void;
  disconnectUser: (connectingUser: UserProfile) => void;

  // Player input interception
  onLeftPressed?: (playerId: string) => void;
  onRightPressed?: (playerId: string) => void;

  shutdown: () => void;
}
