import { IAppConfig } from './server.config';
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import express, {
  Express, Router,
} from "express";
import { ILogManager } from '@splash/logger';
import { createServer, Server } from "http"
import { Server as SocketIOServer } from "socket.io";
import {SocketHandler} from "./game/interface";

class ExpressServerApp {
  private readonly _config: IAppConfig;
  private readonly _logger: ILogManager;
  private readonly _app: Express;
  private readonly _httpServer: Server;
  private readonly _socketIoServer: SocketIOServer;

  public constructor(config: IAppConfig) {
    this._config = config;
    this._logger = config.logger.child('server');
    this._app = express();
    this._httpServer = createServer(this._app);
    this._socketIoServer = new SocketIOServer(this._httpServer);
  }

  public bootstrap = async ({routes, handlers}: {routes?: Router, handlers?: SocketHandler[]}): Promise<void> => {
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

    if (routes) {
      this._app.use("/", routes);
    }

    if (handlers) {
      const sharedDatabase = {}

      this._socketIoServer.on('connection', (socket) => {
        const connectionDatabase = {}

        for (const registerHandler of handlers) {
          registerHandler(this._socketIoServer, socket, {local: connectionDatabase, shared: sharedDatabase})
        }
      });
    }

    this._logger.info('Starting server...');

    await new Promise<void>((resolve, reject) => {
      this._httpServer.listen(this._config.port, () => {
        this._logger.info(`App listening on port ${this._config.port}`)
        resolve()
      })

      this._httpServer.once('error', (err) => {
        this._logger.error(
          `There was an error starting the server: ${JSON.stringify(err)}`
        );
        reject(err);
      });
    })
  };

  public teardown = async (): Promise<void> => {
    this._logger.info(`Terminating server on ${this._config.port} port...`);
    this._httpServer.close();
    this._socketIoServer.close();
  }

  public get app(): Express {
    return this._app;
  }
}

export default ExpressServerApp;
