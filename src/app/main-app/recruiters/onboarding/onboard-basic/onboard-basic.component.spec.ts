import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardBasicComponent } from './onboard-basic.component';

describe('OnboardBasicComponent', () => {
  let component: OnboardBasicComponent;
  let fixture: ComponentFixture<OnboardBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
