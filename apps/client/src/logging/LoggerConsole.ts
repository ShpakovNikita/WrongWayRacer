/* eslint-disable no-console */

import { envConfig } from '@/configs/env';

class LoggerConsole {
  private readonly _isDEV;

  constructor() {
    this._isDEV = envConfig.env === 'development' || envConfig.env === 'staging';
  }

  public log = (message?: string): void => {
    if (this._isDEV) {
      console.log(message);
    } // TODO: else - some useful production handlers
  };

  public debug = (message?: string): void => {
    if (this._isDEV) {
      console.debug(message);
    }
  };

  // eslint-disable-next-line class-methods-use-this
  public error = (message?: string | unknown): void => {
    if (typeof message === 'string') {
      console.error(message);
    }
    console.error(JSON.stringify(message));
  };
}

export default LoggerConsole;
