import { ILoggerConfig, ILogManager, LogManager } from '@splash/logger';
import * as process from 'process';

export interface IAppConfig {
  port: number;
  corsUrl: string;
  nodeEnv: 'production' | 'development' | string;

  logger: ILogManager;
}

export const createConfig = (): IAppConfig => {
  const loggerConfig: ILoggerConfig = {
    logLevel: process.env.LOG_LEVEL || 'info',
  };

  const rootLogger = new LogManager(loggerConfig, '@splash');

  const config: IAppConfig = {
    logger: rootLogger,
    port: parseInt(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV,
    corsUrl: process.env.CORS_URL,
  };

  return config;
};
