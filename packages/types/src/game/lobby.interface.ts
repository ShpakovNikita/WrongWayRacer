export enum LobbyEventType {
  // User game logic
  startWrongWayRacer = 'lobby:startWrongWayRacer',
  createUser = 'lobby:createUser',

  // Server to client events
  enteredArena = 'lobby:enteredArena',
  leavedArena = 'lobby:leavedArena'
}

export type CreateUserPayload = {
  username: string;
};

export type StartWrongWayRacerPayload = {
  gameSpeed: number;
};

export type UserProfile = {
  id: string;
  username: string;
};

export type EnteredArenaPayload = {};

export type LeavedArenaPayload = {};
