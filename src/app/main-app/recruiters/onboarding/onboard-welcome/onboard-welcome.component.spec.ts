import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardWelcomeComponent } from './onboard-welcome.component';

describe('OnboardWelcomeComponent', () => {
  let component: OnboardWelcomeComponent;
  let fixture: ComponentFixture<OnboardWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
