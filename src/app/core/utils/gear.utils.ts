import { Gear } from '../enums/gear';

export function getGearList(): Gear[] {
  return [
    Gear.None,
    Gear.Custom,
    Gear.Resonance,
    Gear.T2All,
    Gear.T3All,
    Gear.T4All,
  ];
}

export function getGearIndex(gear: Gear): number {
  return getGearList().findIndex((e) => e === gear);
}
