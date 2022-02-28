import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { DataService } from '../models/data.service';
import { Ascension, Faction, Hero } from '../models/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  nbrHeroes = 0;
  filteredHeroes: Hero[] = [];
  currentHero: Hero | null = null;
  factions: Faction[];
  currentFilter: Faction | null = null;
  displayEditModal = false;
  displayFilterModal = false;
  ascendList: Ascension[];

  constructor(
    public accountService: AccountService,
    public dataService: DataService,
    public router: Router
  ) {
    this.factions = [
      Faction.LightBearer,
      Faction.Mauler,
      Faction.Wilder,
      Faction.Graveborn,
      Faction.Celestial,
      Faction.Hypogean,
      Faction.Dimensional
    ];
    this.ascendList = [
      Ascension.NOT_ACQUIRED,
      Ascension.Elite,
      Ascension.ElitePlus,
      Ascension.Legendary,
      Ascension.LegendaryPlus,
      Ascension.Mythic,
      Ascension.MythicPlus,
      Ascension.Ascended,
      Ascension.Ascended1,
      Ascension.Ascended2,
      Ascension.Ascended3,
      Ascension.Ascended4,
      Ascension.Ascended5
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
      this.setFilteredHeroes(this.heroes
        .filter(hero => hero.faction === faction))
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
    this.nbrHeroes = this.filteredHeroes
      .filter(h => h.ascend > Ascension.NOT_ACQUIRED).length;
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

  closeModal() {
    this.displayEditModal = false;
    this.displayFilterModal = false;
  }

  closeHero(): void {
    this.currentHero = null;
  }

  saveHero(hero: Hero) {
    this.dataService.saveHero(hero);
    this.updateNbrHeroes();
  }

  toggleGearHand(hero: Hero) {
    hero.gearHand = !hero.gearHand;
    this.saveHero(hero);
  }

  toggleGearHead(hero: Hero) {
    hero.gearHead = !hero.gearHead;
    this.saveHero(hero);
  }

  toggleGearBody(hero: Hero) {
    hero.gearBody = !hero.gearBody;
    this.saveHero(hero);
  }

  toggleGearFoot(hero: Hero) {
    hero.gearFoot = !hero.gearFoot;
    this.saveHero(hero);
  }

  onBlur(event: any) {
    if (event.target.classList.value.includes('modal')) {
      this.displayEditModal = false;
      this.displayFilterModal = false;
    }
  }

}
