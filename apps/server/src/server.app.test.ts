import Server from './server.app';
import request from 'supertest';
import httpStatus from 'http-status';
import routes from './routes';
import testConfig from './test.config';

const server = new Server(testConfig);

describe('Check @splash/server', () => {
  beforeAll(async () => {
    await server.bootstrap({ routes });
  });
  test('Check whether express.js server is initialized', (done) => {
    request(server.app).get('/').expect(httpStatus.OK, done);
  });
  afterAll(async () => {
    await server.teardown();
  });
});
