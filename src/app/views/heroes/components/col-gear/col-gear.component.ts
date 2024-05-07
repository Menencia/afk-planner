import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Gear } from 'src/app/core/enums/gear';

@Component({
  selector: 'app-col-gear',
  standalone: true,
  imports: [TranslateModule],
  template: `<div [class]="getClass(gear)">
    {{ 'gear.' + gear | translate }}
  </div>`,
})
export class ColGearComponent {
  @Input() gear = Gear.None;

  getClass(gear: Gear) {
    return {
      'bg-red-200': gear === Gear.T4All,
      'bg-orange-200': gear === Gear.T3All,
      'text-gray-400': gear === Gear.Resonance,
      'dark:bg-red-600': gear === Gear.T4All,
      'dark:bg-orange-600': gear === Gear.T3All,
      'dark:text-gray-400': gear === Gear.Resonance,
    };
  }
}
