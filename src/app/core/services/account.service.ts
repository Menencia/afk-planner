import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { Hero } from '../models/hero';
import { PrioritySi } from '../models/priorities/priority-si';
import { Save } from '../models/save';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  heroes: Hero[] = [];
  si: PrioritySi[] = [];
  isReady = new Subject();

  constructor(
    public auth: AuthService,
    public dataService: DataService,
    public http: HttpClient
  ) { }

  async getHeroes(): Promise<Hero[]> {
    if (this.heroes.length > 0) {
      return this.heroes;
    }

    const heroes$ = this.http.get('assets/heroes.json');
    const heroes = await firstValueFrom(heroes$) as Partial<Hero>[];
    this.heroes = heroes.map((heroSave: Partial<Hero>) => {
      return new Hero().load(heroSave);
    });

    // build save
    let save: Save = {heroes: []};
    save.heroes = await this.dataService.getHeroes();

    // load save
    save.heroes.forEach((heroSave: Partial<Hero>) => {
      const hero = this.heroes.find(h => h.id === heroSave.id);
      if (hero) {
        hero.load(heroSave);
      }
    });

    return this.heroes;
  }
}
