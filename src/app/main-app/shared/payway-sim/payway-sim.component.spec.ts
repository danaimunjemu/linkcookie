import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaywaySimComponent } from './payway-sim.component';

describe('PaywaySimComponent', () => {
  let component: PaywaySimComponent;
  let fixture: ComponentFixture<PaywaySimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaywaySimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaywaySimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
