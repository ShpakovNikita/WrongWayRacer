import {LogManager} from "@splash/logger";
import {IAppConfig} from "./server.config";

const testConfig: IAppConfig = {
  port: 8080,
  corsUrl: "*",
  nodeEnv:  'development',

  logger: new LogManager({logLevel: 'debug'}, 'server.test')
}

export default testConfig

