import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { Ascension, Hero } from 'src/app/core/models/hero';

@Component({
  selector: 'app-hero-edit',
  standalone: true,
  imports: [TranslateModule, DialogModule, FormsModule, NgFor, NgIf],
  templateUrl: './hero-edit.component.html',
  styleUrl: './hero-edit.component.scss',
})
export class HeroEditComponent {
  @Input() visible = false;

  @Input() hero?: Hero;

  @Output() visibleChange = new EventEmitter();

  @Output() heroChange = new EventEmitter();

  ascendList: Ascension[] = [
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
    Ascension.Ascended5,
  ];

  saveHero() {
    this.heroChange.emit();
  }
}
