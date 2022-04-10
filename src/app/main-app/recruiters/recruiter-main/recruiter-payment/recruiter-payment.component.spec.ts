import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterPaymentComponent } from './recruiter-payment.component';

describe('RecruiterPaymentComponent', () => {
  let component: RecruiterPaymentComponent;
  let fixture: ComponentFixture<RecruiterPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
