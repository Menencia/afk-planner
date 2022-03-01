import { Component, OnInit } from '@angular/core';
import { Ascension, Faction, Hero } from '../models/hero';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.scss']
})
export class PrioritiesComponent implements OnInit {

  constructor() {
    
  }

  ngOnInit(): void {
  }

  showEditModal() {
    // todo
  }

}
