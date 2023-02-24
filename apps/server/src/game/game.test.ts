import Server from '../server.app';
import testConfig from '../test.config';
import { registerGameHandlers } from './index';
import { io as clientIo, Socket as ClientSocket } from 'socket.io-client';
import { Server as ServerIOServer, Socket as ServerSocket } from 'socket.io';

describe('Check sockets working', () => {
  const server = new Server(testConfig);
  let clientSocket: ClientSocket;
  let serverSocket: ServerSocket;
  let io: ServerIOServer;

  beforeAll((done) => {
    server
      .bootstrap({
        handlers: [
          ...Object.values(registerGameHandlers),
          (ioServer, socket) => {
            serverSocket = socket;
            io = ioServer;
          }
        ]
      })
      .then(() => {
        clientSocket = clientIo(`http://localhost:${testConfig.port}`);
        clientSocket.on('connect', done);
      });
  });

  test('should work', (done) => {
    clientSocket.on('hello', (arg) => {
      expect(arg).toBe('world');
      done();
    });
    serverSocket.emit('hello', 'world');
  });

  test('should work (with ack)', (done) => {
    serverSocket.on('hi', (cb) => {
      cb('hola');
    });
    clientSocket.emit('hi', (arg) => {
      expect(arg).toBe('hola');
      done();
    });
  });

  afterAll(async () => {
    await server.teardown();
  });
});
