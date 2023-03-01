export type ChatData = {};

export type Player = {
  username: string;
  avatarSrc: string;
};

export type ChatMessage = {
  id: number;
  player: Player;
  message: string;
};

export type LadderPlace = {
  player: Player;
  time: number;
  rank: number;
};

export type Ladder = {
  top: LadderPlace[];
  my: LadderPlace;
  playersCount: number;
};

export type Room = { players: Player[]; roomSize: number; chat: ChatMessage[]; ladder: Ladder };

const player1: Player = {
  username: 'Skylar Baptista',
  avatarSrc: 'https://placebeard.it/100/100'
};

const player2: Player = {
  username: 'Wilson Rosser',
  avatarSrc: 'https://placebeard.it/101/101'
};

const player3: Player = {
  username: 'Mikita Shpakau',
  avatarSrc: 'https://placebeard.it/102/102'
};

const player4: Player = {
  username: 'Leo Aminoff',
  avatarSrc: 'https://placebeard.it/103/103'
};

const player5: Player = {
  username: 'Livia Bator',
  avatarSrc: 'https://placebeard.it/104/104'
};

const player6: Player = {
  username: 'Ahmad Dias',
  avatarSrc: 'https://placebeard.it/105/105'
};

const ladder: Ladder = {
  top: [
    {
      player: player1,
      time: 2 * 60 + 44,
      rank: 1
    },
    {
      player: player2,
      time: 2 * 60 + 49,
      rank: 2
    },
    {
      player: player4,
      time: 2 * 60 + 54,
      rank: 3
    },
    {
      player: player5,
      time: 3 * 60 + 22,
      rank: 4
    },
    {
      player: player6,
      time: 3 * 60 + 24,
      rank: 5
    }
  ],
  my: {
    player: player3,
    time: 3 * 60 + 44,
    rank: 144
  },
  playersCount: 15000
};

const chat: ChatMessage[] = [
  {
    id: 1,
    player: player1,
    message: 'how you doing mate'
  },
  {
    id: 2,
    player: player2,
    message: 'Not bad'
  },
  {
    id: 3,
    player: player1,
    message: 'did you win last round'
  },
  {
    id: 4,
    player: player2,
    message: 'Yes, headed for 2:30'
  },
  {
    id: 5,
    player: player1,
    message: 'wow Cool!'
  },
  {
    id: 6,
    player: player1,
    message: 'how you doing mate'
  },
  {
    id: 7,
    player: player2,
    message: 'Not bad'
  },
  {
    id: 8,
    player: player1,
    message: 'did you win last round'
  },
  {
    id: 9,
    player: player2,
    message: 'Yes, headed for 2:30'
  },
  {
    id: 10,
    player: player1,
    message: 'wow Cool!'
  }
];

const roomPlayers: Player[] = [
  player1,
  player2,
  player4,
  player5,
  player6,
  {
    username: 'Brandon Dokidis',
    avatarSrc: 'https://placebeard.it/106/106'
  },
  player3
];

export const room: Room = {
  players: roomPlayers,
  roomSize: 12,
  chat,
  ladder
};
