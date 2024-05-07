import { Classe, Faction, Hero, Type } from '../../hero';

export class Lucius extends Hero {
  name = 'Lucius';

  faction = Faction.LightBearer;

  type = Type.Strength;

  classe = Classe.Tank;
}
