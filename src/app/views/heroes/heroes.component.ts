import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Ascension, Faction, Hero } from '../../core/models/hero';
import { AccountService } from '../../core/services/account.service';
import { DataService } from '../../core/services/data.service';

import { HeroEditComponent } from './components/hero-edit/hero-edit.component';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, TranslateModule, HeroEditComponent],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  nbrHeroes = 0;

  filteredHeroes: Hero[] = [];

  currentHero?: Hero;

  factions: Faction[];

  currentFilter: Faction | null = null;

  displayEditModal = false;

  displayFilterModal = false;

  constructor(
    public accountService: AccountService,
    public dataService: DataService,
    public router: Router,
  ) {
    this.factions = [
      Faction.LightBearer,
      Faction.Mauler,
      Faction.Wilder,
      Faction.Graveborn,
      Faction.Celestial,
      Faction.Hypogean,
      Faction.Dimensional,
    ];
  }

  ngOnInit() {
    this.getHeroes();
  }

  async getHeroes() {
    this.heroes = await this.accountService.getHeroes();
    this.setFilteredHeroes(this.heroes);
  }

  filterFaction(faction: Faction) {
    if (this.currentFilter !== faction) {
      this.currentFilter = faction;
      this.setFilteredHeroes(
        this.heroes.filter((hero) => hero.faction === faction),
      );
    } else {
      this.currentFilter = null;
      this.setFilteredHeroes(this.heroes);
    }
  }

  setFilteredHeroes(heroes: Hero[]) {
    this.filteredHeroes = heroes.sort(this.sortHeroes);
    this.updateNbrHeroes();
  }

  updateNbrHeroes() {
    this.nbrHeroes = this.filteredHeroes.filter(
      (h) => h.ascend > Ascension.NOT_ACQUIRED,
    ).length;
  }

  sortHeroes(a: Hero, b: Hero) {
    if (a.rc && !b.rc) return -1;
    if (!a.rc && b.rc) return 1;
    if (a.ascend > b.ascend) return -1;
    if (a.ascend < b.ascend) return 1;
    if (a.engrave > b.engrave) return -1;
    if (a.engrave < b.engrave) return 1;
    if (a.si > b.si) return -1;
    if (a.si < b.si) return 1;
    if (a.fi > b.fi) return -1;
    if (a.fi < b.fi) return 1;
    return 0;
  }

  editHero(hero: Hero) {
    this.currentHero = hero;
    this.displayEditModal = true;
  }

  filter() {
    this.displayFilterModal = true;
  }

  closeHero(): void {
    this.currentHero = undefined;
  }

  saveHero() {
    if (this.currentHero) {
      this.dataService.saveHero(this.currentHero);
      this.updateNbrHeroes();
    }
  }

  onBlur(event: MouseEvent) {
    if ((event.target as Element).classList.value.includes('modal')) {
      this.displayFilterModal = false;
    }
  }
}
