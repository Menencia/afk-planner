import { Injectable } from '@angular/core';
import { DataService } from './models/data.service';
import { Hero, HeroSave } from './models/hero';
import { initHeroes } from './models/hero-loader';
import { PrioritySi } from './models/priorities/priority-si';
import { Save } from './models/save';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  heroes: Hero[] = [];
  si: PrioritySi[];

  constructor(
    public auth: AuthService,
    public dataService: DataService
  ) {
    this.heroes = initHeroes();
    this.si = [];

    this.run();
  }

  async run(): Promise<void> {
    // search for save
    let save: Save = {heroes: []};
    save.heroes = await this.dataService.getHeroes();

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
}
