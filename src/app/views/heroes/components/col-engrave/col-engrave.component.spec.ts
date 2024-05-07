import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColEngraveComponent } from './col-engrave.component';

describe('ColSiComponent', () => {
  let component: ColEngraveComponent;
  let fixture: ComponentFixture<ColEngraveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColEngraveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColEngraveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
