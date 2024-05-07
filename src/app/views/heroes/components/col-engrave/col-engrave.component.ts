import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-col-engrave',
  standalone: true,
  imports: [],
  template: `<div [class]="getClass(engrave)">{{ engrave }}</div>`,
})
export class ColEngraveComponent {
  @Input() engrave = 0;

  getClass(engrave: number) {
    return {
      'bg-red-200': engrave >= 60,
      'bg-orange-200': engrave >= 30,
      'text-gray-400': engrave === 0,
      'dark:bg-red-600': engrave >= 60,
      'dark:bg-orange-600': engrave >= 30,
      'dark:text-gray-400': engrave === 0,
    };
  }
}
