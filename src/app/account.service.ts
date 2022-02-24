import { Injectable } from '@angular/core';
import { Hero, HeroSave } from './models/hero';
import { initHeroes } from './models/hero-loader';
import { PrioritySi } from './models/priorities/priority-si';
import { Save } from './models/save';

const SAVE_1 = 'afk-planner';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  heroes: Hero[] = [];
  si: PrioritySi[];

  constructor() {
    this.heroes = initHeroes();
    this.si = [];

    this.run();
  }

  run(): void {
    // search for save
    let save;
    const s = localStorage[SAVE_1];
    if (s) {
      save = JSON.parse(atob(s));
    }

    // load save
    if (save) {
      this.load(save);
    }
  }

  load(save: Save): void {
    save.heroes.forEach((heroSave: HeroSave) => {
      const found = this.heroes.find(hero => hero.name === heroSave.name);
      if (found) {
        found.load(heroSave);
      }
    });
  }

  getHero(name: string): Hero {
    const hero = this.heroes.find(h => h.name = name)
    if (hero) {
      return hero;
    }
    throw new Error('Hero not found');
  }

  export(): Save {
    return {
      heroes: this.exportHeroes()
    };
  }

  exportHeroes(): HeroSave[] {
    const res: HeroSave[] = [];
    this.heroes.forEach(hero => {
      res.push(hero.export());
    });
    return res;
  }

  save(): void {
    const s = this.export();
    const ss = btoa(JSON.stringify(s));
    localStorage[SAVE_1] = ss;
  }
}
