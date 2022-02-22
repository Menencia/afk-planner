export enum Faction {
  LightBearer,
  Mauler,
  Wilder,
  Graveborn,
  Celestial,
  Hypogean,
  Dimensional
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

export interface HeroData {
  name?: string;
  si?: number;
  fi?: number;
  engraving?: number;
}

export class Hero {

  constructor(
    public name: string,
    public faction: Faction,
    public type: Type,
    public classe: Classe,
    public ascension: Ascension = Ascension.Elite,
    public ascensionPriority: Ascension = Ascension.Elite,
    public siEnabled: boolean = false,
    public si: number = 0,
    public fi: number = 0,
    public engraving: number = 0,
    public equipment: number = 0,
  ) { }

  hasSI(): boolean {
    return this.ascension > Ascension.Mythic && this.siEnabled;
  }

  hasFI(): boolean {
    return this.ascension > Ascension.Ascended;
  }

  hasEngraving(): boolean {
    return this.ascension > Ascension.Ascended1;
  }

  export(): HeroData {
    const res: HeroData = {};
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
      res.name = this.name;
    }
    return res;
  }

}
