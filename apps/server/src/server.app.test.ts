import Server from "./server.app";
import request from "supertest";
import httpStatus from "http-status";
import {LogManager} from "@splash/logger";
import {IAppConfig} from "./server.config";

const testConfig: IAppConfig = {
  port: 8080,
  corsUrl: "*",
  nodeEnv:  'development',

  logger: new LogManager({logLevel: 'debug'}, 'server.test')
}

const server = new Server(testConfig);

describe("Check @clueby/server-express", () => {
  beforeAll(async () => {
    await server.bootstrap();
  });
  test("Check whether express.js server is initialized", (done) => {
    request(server.app).get("/").expect(httpStatus.OK, done);
  });
});
