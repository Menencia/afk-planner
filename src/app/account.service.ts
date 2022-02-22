import { Injectable } from '@angular/core';
import { Classe, Faction, Hero, HeroData, Type } from './models/hero';
import { PrioritySi } from './models/priorities/priority-si';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  heroes: Hero[] = [];
  si: PrioritySi[];

  constructor() {
    this.initHeroes();
    this.si = [];
  }

  initHeroes(): void {
    const list = ['Lucius', 'Rowan'];
    const save = this.getSave();
    list.forEach((name: string) => {
      const hero = new Hero(name, Faction.LightBearer, Type.Strength, Classe.Tank);
      const found = save.find((e: HeroData) => e.name === name);
      if (found) {
        Object.assign(hero, found);
      }
      this.heroes.push(hero);
    });
  }

  getSave(): Hero[] {
    let save = [];
    const s = localStorage['heroes'];
    if (s) {
      save = JSON.parse(atob(s));
    }
    return save;
  }

  getHero(name: string): Hero {
    const hero = this.heroes.find(h => h.name = name)
    if (hero) {
      return hero;
    }
    throw new Error('Hero not found');
  }

  save(): void {
    const data: HeroData[] = [];
    this.heroes.forEach(hero => {
      const d = hero.export();
      if (Object.keys(d).length > 0) {
        data.push(d);
      }
    });
    localStorage.setItem('heroes', btoa(JSON.stringify(data)));
  }
}
