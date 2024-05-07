import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColGearComponent } from './col-gear.component';

describe('ColSiComponent', () => {
  let component: ColGearComponent;
  let fixture: ComponentFixture<ColGearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColGearComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColGearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
