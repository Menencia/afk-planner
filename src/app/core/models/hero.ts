import { Ascension } from '../enums/ascension';
import { Faction } from '../enums/faction';
import { Gear } from '../enums/gear';
import { Klass } from '../enums/klass';
import { Role } from '../enums/role';
import { Type } from '../enums/type';

export class Hero {
  id: number = 0;

  uid: string = '';

  name: string = '';

  faction = Faction.Celestial;

  type = Type.Agility;

  classe = Klass.Mage;

  role = Role.Buffer;

  ascend = Ascension.None;

  siEnabled = false;

  si = 0;

  fi = 0;

  engrave = 0;

  gear = Gear.None;

  rc = false;

  load(data: Partial<Hero>): Hero {
    Object.assign(this, data);
    return this;
  }

  getImage(): string {
    const name = this.name.toLocaleLowerCase().replace(/ /g, '-');
    return `assets/heroes/${this.id}-${name}.jpg`;
  }

  isFull() {
    return (
      this.si >= 30 &&
      this.fi >= 9 &&
      this.engrave >= 60 &&
      this.gear === Gear.T4All
    );
  }

  hasSI(): boolean {
    return this.ascend > Ascension.Mythic && this.siEnabled;
  }

  hasFI(): boolean {
    return this.ascend > Ascension.Ascend;
  }

  hasEngrave(): boolean {
    return this.ascend > Ascension.Ascend1;
  }

  export(): Partial<Hero> | undefined {
    const res: Partial<Hero> = {};

    if (this.ascend !== Ascension.None) {
      res.ascend = this.ascend;
    }

    if (this.si > 0) {
      res.si = this.si;
    }

    if (this.fi > 0) {
      res.fi = this.fi;
    }

    if (this.engrave > 0) {
      res.engrave = this.engrave;
    }

    if (this.rc) {
      res.rc = true;
    }

    if (this.gear !== Gear.None) {
      res.gear = this.gear;
    }

    if (Object.keys(res).length > 0) {
      res.id = this.id;
      return res;
    }
    return undefined;
  }
}
