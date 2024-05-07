import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Ascension } from 'src/app/core/enums/ascension';

@Component({
  selector: 'app-col-ascend',
  standalone: true,
  imports: [TranslateModule],
  template: `<div [class]="getClass(ascend)">
    {{ 'ascend.' + ascend | translate }}
  </div>`,
})
export class ColAscendComponent {
  @Input() ascend = Ascension.None;

  getClass(ascend: Ascension) {
    return {
      'text-gray-400': ascend === Ascension.Ascend5,
    };
  }
}
