import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { AccountService } from '../account.service';
import { Hero } from '../models/hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  hero: Hero | null;

  constructor(
    public route: ActivatedRoute,
    public account: AccountService
  ) {
    this.hero = null;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.hero = this.account.getHero(params['name']);
    });
  }

}
