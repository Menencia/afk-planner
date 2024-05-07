import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColAscendComponent } from './col-ascend.component';

describe('ColSiComponent', () => {
  let component: ColAscendComponent;
  let fixture: ComponentFixture<ColAscendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColAscendComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColAscendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
