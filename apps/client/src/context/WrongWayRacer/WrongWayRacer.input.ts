import { IController } from '@/api/socket/interface';

export interface IWrongWayRacerInputDelegate {
  onLeftPressed?: () => Promise<void> | void;
  onRightPressed?: () => Promise<void> | void;
}

export class WrongWayRacerInputController implements IController {
  private readonly _delegate: IWrongWayRacerInputDelegate;

  constructor(delegate: IWrongWayRacerInputDelegate) {
    this._delegate = delegate;
  }

  public activate = (): void => {
    document.addEventListener('keydown', this.onKeyDown);
  };

  public deactivate = (): void => {
    document.removeEventListener('keydown', this.onKeyDown);
  };

  private onKeyDown = async (event: KeyboardEvent): Promise<void> => {
    if (event.defaultPrevented) {
      return;
    }

    if ((event.code === 'ArrowLeft' || event.code === 'KeyA') && this._delegate?.onLeftPressed) {
      await this._delegate.onLeftPressed();
    } else if ((event.code === 'ArrowRight' || event.code === 'KeyD') && this._delegate?.onRightPressed) {
      await this._delegate.onRightPressed();
    }

    event.preventDefault();
  };
}
