import UIkit from 'uikit';

export enum Status {
    Primary = 'primary',
    Danger = 'danger'
}

export class Utils {

  static notify(msg: string, status = Status.Primary): void {
    const msgError = 'The user account has been disabled by an administrator.';
    if (msg === msgError) {
      msg = 'Votre compte doit être activé par un admin.';
    }
    UIkit.notification(msg, {
      status,
      pos: 'bottom-right'
    });
  }

}
