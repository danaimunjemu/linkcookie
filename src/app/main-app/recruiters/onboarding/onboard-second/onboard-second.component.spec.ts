import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardSecondComponent } from './onboard-second.component';

describe('OnboardSecondComponent', () => {
  let component: OnboardSecondComponent;
  let fixture: ComponentFixture<OnboardSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardSecondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
