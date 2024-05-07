import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColFiComponent } from './col-fi.component';

describe('ColSiComponent', () => {
  let component: ColFiComponent;
  let fixture: ComponentFixture<ColFiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColFiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColFiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
