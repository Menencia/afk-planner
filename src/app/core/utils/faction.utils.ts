import { Faction } from '../enums/faction';

export function getFactionList(): Faction[] {
  return [
    Faction.LightBearer,
    Faction.Mauler,
    Faction.Wilder,
    Faction.Graveborn,
    Faction.Celestial,
    Faction.Hypogean,
    Faction.Dimensional,
    Faction.Draconis,
  ];
}

export function getFactionIndex(faction: Faction): number {
  return getFactionList().findIndex((e) => e === faction);
}
