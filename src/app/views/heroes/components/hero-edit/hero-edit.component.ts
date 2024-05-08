import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { Ascension } from 'src/app/core/enums/ascension';
import { Gear } from 'src/app/core/enums/gear';
import { Hero } from 'src/app/core/models/hero';
import { getAscendList } from 'src/app/core/utils/ascend.utils';
import { getGearList } from 'src/app/core/utils/gear.utils';

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

  ascendList: Ascension[] = getAscendList();

  gearList: Gear[] = getGearList();

  saveHero() {
    this.heroChange.emit();
  }
}
