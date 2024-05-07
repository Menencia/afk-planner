export enum Status {
  Primary = 'primary',
  Danger = 'danger',
}

export class Utils {
  static notify(msg: string): void {
    const msgError = 'The user account has been disabled by an administrator.';
    if (msg === msgError) {
      // eslint-disable-next-line no-console
      console.log('Votre compte doit être activé par un admin.');
    }
    /* UIkit.notification(msg, {
      status,
      pos: 'bottom-right'
    }); */
  }

  static loadImage(src: string): Promise<HTMLImageElement | undefined> {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        resolve(undefined);
      };
    });
  }
}
