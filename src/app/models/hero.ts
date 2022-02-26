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
  ascension = Ascension.Elite;
  siEnabled = false;
  si = 0;
  fi = 0;
  engraving = 0;
  equipment = 0;

  constructor() { }

  load(data: Partial<Hero>): Hero {
    Object.assign(this, data);
    return this;
  }

  hasSI(): boolean {
    return this.ascension > Ascension.Mythic && this.siEnabled;
  }

  hasFI(): boolean {
    return this.ascension > Ascension.Ascended;
  }

  hasEngraving(): boolean {
    return this.ascension > Ascension.Ascended1;
  }

  export(): Partial<Hero> | undefined {
    const res: Partial<Hero> = {};

    if (this.ascension > Ascension.Elite) {
      res.ascension = this.ascension;
    }

    if (this.si > 0) {
      res.si = this.si;
    }

    if (this.fi > 0) {
      res.fi = this.fi;
    }

    if (this.engraving > 0) {
      res.engraving = this.engraving;
    }

    if (Object.keys(res).length > 0) {
      res.id = this.id;
      res.name = this.name;
      return res;
    }
    return undefined;
  }

}
