import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/./../.env' });

import ExpressServerApp from './server.app';
import { registerGameHandlers } from './game';
import { createConfig } from './server.config';
import routes from './routes';

const listenForShutdown = (app: ExpressServerApp) => {
  process.on('SIGTERM', async () => {
    await app.teardown();
  });

  process.on('SIGINT', async () => {
    await app.teardown();
  });
};

async function bootstrap(): Promise<void> {
  const config = createConfig();
  const app = new ExpressServerApp(config);
  await app.bootstrap({ routes, handlers: Object.values(registerGameHandlers) });

  listenForShutdown(app);
}

bootstrap().then();
