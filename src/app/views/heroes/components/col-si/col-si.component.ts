import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-col-si',
  standalone: true,
  imports: [],
  template: `<div [class]="getClass(si)">{{ si }}</div>`,
})
export class ColSiComponent {
  @Input() si = 0;

  getClass(si: number) {
    return {
      'bg-red-200': si >= 30,
      'bg-orange-200': si >= 20,
      'text-gray-400': si === 0,
      'dark:bg-red-600': si >= 30,
      'dark:bg-orange-600': si >= 20,
      'dark:text-gray-400': si === 0,
    };
  }
}
