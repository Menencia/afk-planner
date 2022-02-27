export enum Faction {
  LightBearer = 'lightbearers',
  Mauler = 'maulers',
  Wilder = 'wilders',
  Graveborn = 'graveborns',
  Celestial = 'celestials',
  Hypogean = 'hypogeans',
  Dimensional = 'dimensionals'
}

export enum Type {
  Strength,
  Agility,
  Intelligence
}

export enum Classe {
  Warrior,
  Tank,
  Ranger,
  Mage,
  Support
}

export enum Role {
  Tank,
  Aoe,
  Continuous,
  Debuffer,
  Control,
  Buffer,
  Burst,
  Regen,
  Assassin
}

export enum Ascension {
  Elite,
  ElitePlus,
  Legendary,
  LegendaryPlus,
  Mythic,
  MythicPlus,
  Ascended,
  Ascended1,
  Ascended2,
  Ascended3,
  Ascended4,
  Ascended5
};

export class Hero {

  id: number = 0;
  uid: string = '';
  name: string = '';
  faction = Faction.Celestial;
  type = Type.Agility;
  classe = Classe.Mage;
  role = Role.Buffer
  ascend = Ascension.Elite;
  siEnabled = false;
  si = 0;
  fi = 0;
  engrave = 0;
  equipment = 0;

  constructor() { }

  load(data: Partial<Hero>): Hero {
    Object.assign(this, data);
    return this;
  }

  getImage(): string {
    const name = this.name
                     .toLocaleLowerCase()
                     .replace(/ /g, '-');
    return 'assets/heroes/' + this.id + '-' + name + '.jpg';
  }

  hasSI(): boolean {
    return this.ascend > Ascension.Mythic && this.siEnabled;
  }

  hasFI(): boolean {
    return this.ascend > Ascension.Ascended;
  }

  hasEngrave(): boolean {
    return this.ascend > Ascension.Ascended1;
  }

  export(): Partial<Hero> | undefined {
    const res: Partial<Hero> = {};

    if (this.ascend > Ascension.Elite) {
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

    if (Object.keys(res).length > 0) {
      res.id = this.id;
      return res;
    }
    return undefined;
  }

}
