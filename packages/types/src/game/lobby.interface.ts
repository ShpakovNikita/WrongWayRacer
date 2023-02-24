export enum LobbyEventType {
  // User game logic
  startWrongWayRacer = 'lobby:startWrongWayRacer',
  createUser = 'lobby:createUser'
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
