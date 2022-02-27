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
    this.filteredHeroes = this.heroes;
  }

  filterFaction(faction: Faction) {
    if (this.currentFilter !== faction) {
      this.currentFilter = faction;
      this.filteredHeroes = this.heroes.filter(hero => hero.faction === faction);
    } else {
      this.currentFilter = null;
      this.filteredHeroes = this.heroes;
    }
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
  }

  onBlur(event: any) {
    if (event.target.classList.value.includes('modal')) {
      this.displayEditModal = false;
      this.displayFilterModal = false;
    }
  }

}
