import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Ascension } from 'src/app/core/enums/ascension';
import { Faction } from 'src/app/core/enums/faction';
import { getAscendIndex } from 'src/app/core/utils/ascend.utils';
import {
  getFactionIndex,
  getFactionList,
} from 'src/app/core/utils/faction.utils';

import { Hero } from '../../core/models/hero';
import { AccountService } from '../../core/services/account.service';
import { DataService } from '../../core/services/data.service';

import { ColAscendComponent } from './components/col-ascend/col-ascend.component';
import { ColEngraveComponent } from './components/col-engrave/col-engrave.component';
import { ColFiComponent } from './components/col-fi/col-fi.component';
import { ColGearComponent } from './components/col-gear/col-gear.component';
import { ColNameComponent } from './components/col-name/col-name.component';
import { ColSiComponent } from './components/col-si/col-si.component';
import { HeroEditComponent } from './components/hero-edit/hero-edit.component';
import { SwitchFactionComponent } from './components/switch-faction/switch-faction.component';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    TranslateModule,
    HeroEditComponent,
    SwitchFactionComponent,
    ButtonModule,
    CheckboxModule,
    ColNameComponent,
    ColAscendComponent,
    ColSiComponent,
    ColFiComponent,
    ColEngraveComponent,
    ColGearComponent,
  ],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  nbrHeroes = 0;

  filteredHeroes: Hero[] = [];

  currentHero?: Hero;

  currentFaction?: Faction;

  factions = getFactionList();

  displayEditModal = false;

  constructor(
    public accountService: AccountService,
    public dataService: DataService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.getHeroes();
  }

  async getHeroes() {
    this.heroes = await this.accountService.getHeroes();
    this.setFilteredHeroes(this.heroes);
  }

  filterFaction(faction?: Faction) {
    this.currentFaction = faction;
    if (faction) {
      this.setFilteredHeroes(
        this.heroes.filter((hero) => hero.faction === faction),
      );
    } else {
      this.setFilteredHeroes(this.heroes);
    }
  }

  setFilteredHeroes(heroes: Hero[]) {
    this.filteredHeroes = heroes.sort(this.sortHeroes);
    this.updateNbrHeroes();
  }

  updateNbrHeroes() {
    this.nbrHeroes = this.filteredHeroes.filter(
      (h) => h.ascend !== Ascension.None,
    ).length;
  }

  sortHeroes(a: Hero, b: Hero) {
    if (getFactionIndex(a.faction) > getFactionIndex(b.faction)) return 1;
    if (getFactionIndex(a.faction) < getFactionIndex(b.faction)) return -1;
    if (a.rc && !b.rc) return -1;
    if (!a.rc && b.rc) return 1;
    if (a.engrave > b.engrave) return -1;
    if (a.engrave < b.engrave) return 1;
    if (a.fi > b.fi) return -1;
    if (a.fi < b.fi) return 1;
    if (a.si > b.si) return -1;
    if (a.si < b.si) return 1;
    if (getAscendIndex(a.ascend) > getAscendIndex(b.ascend)) return -1;
    if (getAscendIndex(a.ascend) < getAscendIndex(b.ascend)) return 1;
    return 0;
  }

  editHero(hero: Hero) {
    this.currentHero = hero;
    this.displayEditModal = true;
  }

  saveHero() {
    if (this.currentHero) {
      this.dataService.saveHero(this.currentHero);
      this.updateNbrHeroes();
      this.filterFaction(this.currentFaction);
    }
  }
}
