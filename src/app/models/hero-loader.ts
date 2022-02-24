import { Hero } from "./hero";
import { Lucius } from "./heroes/lightbearer/lucius";
import { Rowan } from "./heroes/lightbearer/rowan";

export function initHeroes(): Hero[] {
  const list = [];

  //lightbearer
  list.push(new Rowan());
  list.push(new Lucius());

  return list;
}
