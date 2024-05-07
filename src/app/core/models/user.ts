export interface UserSave {
  uid: string;
  name: string;
  email: string;
  lastConnected: Date;
  lastUpdated: Date;
}

export class User {
  uid: string;

  name: string;

  email: string;

  lastConnected: Date;

  lastUpdated: Date;

  constructor() {
    this.uid = '';
    this.name = '';
    this.email = '';
    this.lastConnected = new Date();
    this.lastUpdated = new Date();
  }

  load(data: UserSave): User {
    this.uid = data.uid;
    this.name = data.name;
    this.email = data.email;
    this.lastConnected = data.lastConnected;
    this.lastUpdated = data.lastUpdated;
    return this;
  }

  export(): UserSave {
    const { uid, name, email, lastConnected, lastUpdated } = this;
    return { uid, name, email, lastConnected, lastUpdated };
  }
}
