import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterAdsComponent } from './recruiter-ads.component';

describe('RecruiterAdsComponent', () => {
  let component: RecruiterAdsComponent;
  let fixture: ComponentFixture<RecruiterAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
