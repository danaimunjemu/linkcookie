import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardThirdComponent } from './onboard-third.component';

describe('OnboardThirdComponent', () => {
  let component: OnboardThirdComponent;
  let fixture: ComponentFixture<OnboardThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardThirdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
