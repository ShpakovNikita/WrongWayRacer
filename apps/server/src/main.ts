import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/./../.env' });

import ExpressServerApp from './server.app';
import { createConfig } from './server.config';

async function bootstrap(): Promise<void> {
  const config = createConfig();
  const app = new ExpressServerApp(config);
  await app.bootstrap();
}

bootstrap().then();
