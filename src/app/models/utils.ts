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
    /*UIkit.notification(msg, {
      status,
      pos: 'bottom-right'
    });*/
  }

  static loadImage(src: string): Promise<HTMLImageElement | undefined> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        resolve(undefined);
      }
    });
  }

}
