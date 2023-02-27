import { CallbackStatus, LobbyEventType, StartWrongWayRacerPayload } from '@splash/types';
import { IController } from './interface';
import { Socket } from 'socket.io-client';
import socketInstance from '@/api/socket/socket.instance';

export interface ILobbyControllerDelegate {
  onEnteredArena?: () => Promise<void> | void;
  onLeavedArena?: () => Promise<void> | void;

  onConnectionEstablished?: () => Promise<void> | void;
  onDisconnect?: () => Promise<void> | void;
  onConnectionError?: () => Promise<void> | void;
}

export class LobbySocketController implements IController {
  private readonly _delegate: ILobbyControllerDelegate;
  private readonly _socket: Socket;

  constructor(delegate: ILobbyControllerDelegate, socket?: Socket) {
    this._delegate = delegate;
    this._socket = socket ?? socketInstance;
  }

  public get connected() {
    return this._socket.connected;
  }

  public activate = (): void => {
    this._socket.on('connect', this._delegate.onConnectionEstablished ?? (() => undefined));
    this._socket.on('disconnect', this._delegate.onDisconnect ?? (() => undefined));
    this._socket.on('connect_error', this._delegate.onConnectionError ?? (() => undefined));

    this._socket.on(LobbyEventType.enteredArena, this._delegate.onEnteredArena ?? (() => undefined));
    this._socket.on(LobbyEventType.leavedArena, this._delegate.onLeavedArena ?? (() => undefined));
  };

  public deactivate = (): void => {
    this._socket.off(LobbyEventType.leavedArena);
    this._socket.off(LobbyEventType.enteredArena);

    this._socket.off('connect_error');
    this._socket.off('disconnect');
    this._socket.off('connect');
  };

  public startWrongWayRacerGame = async (payload: StartWrongWayRacerPayload): Promise<void> => {
    await new Promise<void>((resolve, reject) => {
      this._socket.emit(
        LobbyEventType.startWrongWayRacer,
        payload,
        ({ status }: { status: CallbackStatus }) => {
          if (status === CallbackStatus.ok) {
            resolve();
          } else {
            reject();
          }
        }
      );
    });
  };
}
