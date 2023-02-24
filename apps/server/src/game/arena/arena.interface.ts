import { UserProfile } from '@splash/types';
import { Socket } from 'socket.io';

export interface IGameArena {
  arenaId: string;

  // Player input interception
  onLeftPressed?: (playerId: string) => void;
  onRightPressed?: (playerId: string) => void;

  connectUser?: (connectingUser: UserProfile, socket: Socket) => void;
  disconnectUser?: (connectingUser: UserProfile) => void;
}
