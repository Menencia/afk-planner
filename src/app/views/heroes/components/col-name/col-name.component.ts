import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-col-name',
  standalone: true,
  imports: [TranslateModule, NgIf],
  template: `<div [class]="getClass()">
    <span *ngIf="isAwakened">A-</span>{{ 'heroesName.' + name | translate }}
  </div>`,
})
export class ColNameComponent {
  @Input() name = '';

  @Input() full = false;

  @Input() rc = false;

  @Input() isAwakened = false;

  getClass() {
    return {
      'font-bold': this.full && this.rc,
      underline: this.full && this.rc,
      'text-gray-400': !this.rc,
    };
  }
}
