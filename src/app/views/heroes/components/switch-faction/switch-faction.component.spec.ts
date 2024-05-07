import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchFactionComponent } from './switch-faction.component';

describe('SwitchFactionComponent', () => {
  let component: SwitchFactionComponent;
  let fixture: ComponentFixture<SwitchFactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchFactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwitchFactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
