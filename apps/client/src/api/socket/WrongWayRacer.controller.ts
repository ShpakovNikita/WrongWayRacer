import {
  CarsUpdatedSocketPayload,
  GameFinishedSocketPayload,
  LobbyEventType,
  PlayerExplodedSocketPayload,
  PlayersUpdatedSocketPayload,
  StartWrongWayRacerPayload,
  TimerUpdatedSocketPayload,
  WrongWayRacerSocketEventType
} from '@splash/types';
import { IController } from './interface';
import { io, Socket } from 'socket.io-client';
import { envConfig } from '@/configs/env';

export interface IWrongWayRacerControllerDelegate {
  onTimerUpdated?: (payload: TimerUpdatedSocketPayload) => Promise<void> | void;
  onPlayersUpdated?: (payload: PlayersUpdatedSocketPayload) => Promise<void> | void;
  onCarsUpdated?: (payload: CarsUpdatedSocketPayload) => Promise<void> | void;
  onGameFinished?: (payload: GameFinishedSocketPayload) => Promise<void> | void;
  onPlayerExploded?: (payload: PlayerExplodedSocketPayload) => Promise<void> | void;

  onConnectionEstablished?: () => Promise<void> | void;
  onDisconnect?: () => Promise<void> | void;
  onConnectionError?: () => Promise<void> | void;
}

export class WrongWayRacerController implements IController {
  private readonly _delegate: IWrongWayRacerControllerDelegate;
  private readonly _socket: Socket;

  constructor(delegate: IWrongWayRacerControllerDelegate, socket?: Socket) {
    this._delegate = delegate;
    this._socket = socket ?? io(envConfig.backendUrl, { transports: ['websocket'] });
  }

  public activate = (): void => {
    this._socket.on('connect', this._delegate.onConnectionEstablished ?? (() => undefined));
    this._socket.on('disconnect', this._delegate.onDisconnect ?? (() => undefined));
    this._socket.on('connect_error', this._delegate.onConnectionError ?? (() => undefined));

    this._socket.on(
      WrongWayRacerSocketEventType.gameFinished,
      this._delegate.onGameFinished ?? (() => undefined)
    );

    this._socket.on(
      WrongWayRacerSocketEventType.timerUpdated,
      this._delegate.onTimerUpdated ?? (() => undefined)
    );

    this._socket.on(
      WrongWayRacerSocketEventType.playersUpdated,
      this._delegate.onPlayersUpdated ?? (() => undefined)
    );

    this._socket.on(
      WrongWayRacerSocketEventType.playerExploded,
      this._delegate.onPlayerExploded ?? (() => undefined)
    );

    this._socket.on(
      WrongWayRacerSocketEventType.carsUpdated,
      this._delegate.onCarsUpdated ?? (() => undefined)
    );
  };

  public deactivate = (): void => {
    this._socket.off(WrongWayRacerSocketEventType.carsUpdated);
    this._socket.off(WrongWayRacerSocketEventType.playerExploded);
    this._socket.off(WrongWayRacerSocketEventType.playersUpdated);
    this._socket.off(WrongWayRacerSocketEventType.timerUpdated);
    this._socket.off(WrongWayRacerSocketEventType.gameFinished);

    this._socket.off('connect_error');
    this._socket.off('disconnect');
    this._socket.off('connect');
  };

  public startWrongWayRacerGame = (payload: StartWrongWayRacerPayload): void => {
    this._socket.emit(LobbyEventType.startWrongWayRacer, payload);
  };
}
