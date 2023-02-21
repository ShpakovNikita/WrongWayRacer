import { IAppConfig } from './server.config';
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import express, {
  Express,
} from "express";
import { ILogManager } from '@splash/logger';
import router from './routes'

class ExpressServerApp {
  private readonly _config: IAppConfig;
  private readonly _logger: ILogManager;
  private readonly _app: Express;

  public constructor(config: IAppConfig) {
    this._config = config;
    this._logger = config.logger.child('server');
    this._app = express();
  }

  public bootstrap = async (): Promise<void> => {
    this._logger.info('Initializing server...');

    // set security HTTP headers
    this._app.use(helmet());

    // Add URLs that are allowed to interact with the server
    this._app.use(
      cors({
        origin: this._config.corsUrl,
      })
    );

    // gzip compression
    this._app.use(compression());

    this._app.use("/", router);

    this._logger.info('Starting server...');
    this._app.listen(this._config.port, () => {
      this._config.logger.info(`App listening on port ${this._config.port}`)
    })
  };

  public get app(): Express {
    return this._app;
  }
}

export default ExpressServerApp;
