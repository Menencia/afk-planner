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

export interface HeroSave {
  name: string;
  ascension: Ascension;
  siEnabled: boolean;
  si: number;
  fi: number;
  engraving: number;
  equipment: number;
}

export abstract class Hero {

  abstract name: string;
  abstract faction: Faction;
  abstract type: Type;
  abstract classe: Classe;
  ascension: Ascension;
  siEnabled: boolean;
  si: number;
  fi: number;
  engraving: number;
  equipment: number;

  constructor() { 
    this.ascension = Ascension.Elite;
    this.siEnabled = false;
    this.si = 0;
    this.fi = 0;
    this.engraving = 0;
    this.equipment = 0;
  }

  load(data: HeroSave): Hero {
    this.name = data.name;
    this.ascension = data.ascension;
    this.siEnabled = data.siEnabled;
    this.si = data.si;
    this.fi = data.fi;
    this.engraving = data.engraving;
    this.equipment = data.equipment;
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

  export(): HeroSave {
    const {name, ascension, siEnabled, si, fi, engraving, equipment} = this;
    return {name, ascension, siEnabled, si, fi, engraving, equipment};
  }

}
