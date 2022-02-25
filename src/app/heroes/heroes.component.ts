import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { DataService } from '../models/data.service';
import { Hero } from '../models/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  currentHero: Hero | null;

  constructor(
    public accountService: AccountService,
    public dataService: DataService,
    public router: Router
  ) {
    this.heroes = this.accountService.heroes;
    this.currentHero = null;
  }

  ngOnInit() {
  }

  editHero(hero: Hero) {
    this.currentHero = hero;
  }

  closeHero(): void {
    this.currentHero = null;
  }

  saveHero(hero: Hero) {
    this.dataService.saveHero(hero);
  }

}
