import {
  CarsUpdatedSocketPayload,
  GameFinishedSocketPayload,
  PlayerExplodedSocketPayload,
  PlayersUpdatedSocketPayload,
  TimerUpdatedSocketPayload,
  WrongWayRacerSocketEventType,
  GameStartedSocketPayload
} from '@splash/types';
import { IController } from './interface';
import { Socket } from 'socket.io-client';
import socketInstance from '@/api/socket/socket.instance';

export interface IWrongWayRacerControllerDelegate {
  onTimerUpdated?: (payload: TimerUpdatedSocketPayload) => Promise<void> | void;
  onPlayersUpdated?: (payload: PlayersUpdatedSocketPayload) => Promise<void> | void;
  onCarsUpdated?: (payload: CarsUpdatedSocketPayload) => Promise<void> | void;
  onGameFinished?: (payload: GameFinishedSocketPayload) => Promise<void> | void;
  onGameStarted?: (payload: GameStartedSocketPayload) => Promise<void> | void;
  onPlayerExploded?: (payload: PlayerExplodedSocketPayload) => Promise<void> | void;

  onConnectionEstablished?: () => Promise<void> | void;
  onDisconnect?: () => Promise<void> | void;
  onConnectionError?: () => Promise<void> | void;
}

export class WrongWayRacerSocketController implements IController {
  private readonly _delegate: IWrongWayRacerControllerDelegate;
  private readonly _socket: Socket;

  constructor(delegate: IWrongWayRacerControllerDelegate, socket?: Socket) {
    this._delegate = delegate;
    this._socket = socket ?? socketInstance;
  }

  public get connected() {
    return this._socket.connected;
  }

  public get connectionId() {
    return this._socket.id;
  }

  public activate = (): void => {
    this._socket.on('connect', this._delegate.onConnectionEstablished ?? (() => undefined));
    this._socket.on('disconnect', this._delegate.onDisconnect ?? (() => undefined));
    this._socket.on('connect_error', this._delegate.onConnectionError ?? (() => undefined));

    this._socket.on(
      WrongWayRacerSocketEventType.gameStarted,
      this._delegate.onGameStarted ?? (() => undefined)
    );

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
    this._socket.off(WrongWayRacerSocketEventType.gameStarted);

    this._socket.off('connect_error');
    this._socket.off('disconnect');
    this._socket.off('connect');
  };

  public rightPressed = (): void => {
    this._socket.emit(WrongWayRacerSocketEventType.rightPressed);
  };

  public leftPressed = (): void => {
    this._socket.emit(WrongWayRacerSocketEventType.leftPressed);
  };
}
