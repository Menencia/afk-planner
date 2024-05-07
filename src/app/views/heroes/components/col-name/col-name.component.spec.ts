import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColNameComponent } from './col-name.component';

describe('ColSiComponent', () => {
  let component: ColNameComponent;
  let fixture: ComponentFixture<ColNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColNameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
