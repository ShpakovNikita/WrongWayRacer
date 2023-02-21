import winston, { Logger } from 'winston';
import { TransformableInfo } from 'logform';
import { ILoggerConfig } from './config';

export interface ILogManager {
  debug: (message: string) => void;
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  child: (childPackage?: string) => ILogManager;
  level: string;
}

export class LogManager implements ILogManager {
  private _logger: Logger;
  private readonly _package?: string;
  private readonly _config: ILoggerConfig;

  public constructor(config: ILoggerConfig, packageName?: string) {
    this._package = packageName;
    this._config = config;

    const colorize = winston.format.combine(
      winston.format.label({ label: this._package || '', message: false }),
      winston.format.timestamp({
        format: 'HH:mm:ss',
        alias: 'time',
      }),
      winston.format.timestamp({
        format: 'YYYY-MM-DD',
        alias: 'date',
      }),
      winston.format.printf(
        ({ level, message, label, time, date }: TransformableInfo) =>
          `| [${level.toUpperCase()}] | ${time} | ${date} | ${label} | ${message} `,
      ),
      winston.format.colorize({ all: true }),
    );

    this._logger = winston.createLogger({
      level: config.logLevel,
      format: winston.format.combine(colorize),
      transports: [
        new winston.transports.Console({
          stderrLevels: ['error'],
        }),
      ],
    });
    // https://github.com/winstonjs/winston#using-custom-logging-levels
    winston.addColors({
      info: 'bold cyan',
      warn: 'italic yellow',
      error: 'bold red',
      debug: 'green',
    });
  }

  public warn = (message: string): void => {
    this._logger.warn(message);
  };

  public error = (message: string): void => {
    this._logger.error(message);
  };

  public info = (message: string): void => {
    this._logger.info(message);
  };

  public debug = (message: string): void => {
    this._logger.debug(message);
  };

  public child = (childPackage?: string): LogManager => {
    return new LogManager(
      this._config,
      `${this._package}${childPackage ? `/${childPackage}` : ''}`,
    );
  };

  public get level(): string {
    return this._config.logLevel;
  }
}

export default LogManager;
