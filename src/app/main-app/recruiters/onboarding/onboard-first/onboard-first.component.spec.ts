import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardFirstComponent } from './onboard-first.component';

describe('OnboardFirstComponent', () => {
  let component: OnboardFirstComponent;
  let fixture: ComponentFixture<OnboardFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardFirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
