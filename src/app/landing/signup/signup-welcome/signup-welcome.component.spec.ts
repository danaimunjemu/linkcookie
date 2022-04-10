import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupWelcomeComponent } from './signup-welcome.component';

describe('SignupWelcomeComponent', () => {
  let component: SignupWelcomeComponent;
  let fixture: ComponentFixture<SignupWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
