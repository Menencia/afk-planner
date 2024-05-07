import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColSiComponent } from './col-si.component';

describe('ColSiComponent', () => {
  let component: ColSiComponent;
  let fixture: ComponentFixture<ColSiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColSiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColSiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
