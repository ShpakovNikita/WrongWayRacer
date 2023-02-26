export class GameServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GameServerError';
  }
}
