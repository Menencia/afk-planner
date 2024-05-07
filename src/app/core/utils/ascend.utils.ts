import { Ascension } from '../enums/ascension';

export function getAscendList(): Ascension[] {
  return [
    Ascension.None,
    Ascension.Elite,
    Ascension.ElitePlus,
    Ascension.Legendary,
    Ascension.LegendaryPlus,
    Ascension.Mythic,
    Ascension.MythicPlus,
    Ascension.Ascend,
    Ascension.Ascend1,
    Ascension.Ascend2,
    Ascension.Ascend3,
    Ascension.Ascend4,
    Ascension.Ascend5,
  ];
}

export function getAscendPosition(ascend: Ascension): number {
  return getAscendList().findIndex((e) => e === ascend);
}
