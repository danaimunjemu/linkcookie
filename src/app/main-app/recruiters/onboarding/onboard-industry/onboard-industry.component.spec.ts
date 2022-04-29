import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardIndustryComponent } from './onboard-industry.component';

describe('OnboardIndustryComponent', () => {
  let component: OnboardIndustryComponent;
  let fixture: ComponentFixture<OnboardIndustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardIndustryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
