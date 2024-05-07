import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-col-fi',
  standalone: true,
  imports: [],
  template: `<div [class]="getClass(fi)">{{ fi }}</div>`,
})
export class ColFiComponent {
  @Input() fi = 0;

  getClass(fi: number) {
    return {
      'bg-red-200': fi >= 9,
      'bg-orange-200': fi >= 3,
      'text-gray-400': fi === 0,
      'dark:bg-red-600': fi >= 9,
      'dark:bg-orange-600': fi >= 3,
      'dark:text-gray-400': fi === 0,
    };
  }
}
