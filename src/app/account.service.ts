import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DataService } from './models/data.service';
import { Hero } from './models/hero';
import { PrioritySi } from './models/priorities/priority-si';
import { Save } from './models/save';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  heroes: Hero[] = [];
  si: PrioritySi[] = [];

  constructor(
    public auth: AuthService,
    public dataService: DataService,
    public http: HttpClient
  ) { }

  async getHeroes(): Promise<Hero[]> {
    const heroes$ = this.http.get('assets/heroes.json');
    const heroes = await firstValueFrom(heroes$) as Partial<Hero>[];
    this.heroes = heroes.map((heroSave: Partial<Hero>) => {
      return new Hero().load(heroSave);
    });

    // build save
    let save: Save = {heroes: []};
    save.heroes = await this.dataService.getHeroes();
    console.log(save.heroes)

    // load save
    save.heroes.forEach((heroSave: Partial<Hero>) => {
      const hero = this.heroes.find(h => h.id === heroSave.id && h.name === heroSave.name);
      if (hero) {
        hero.load(heroSave);
      }
    });

    // mark as ready
    return this.heroes;
  }
}
