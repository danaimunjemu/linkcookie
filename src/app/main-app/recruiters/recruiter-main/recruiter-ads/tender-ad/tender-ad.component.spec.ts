import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderAdComponent } from './tender-ad.component';

describe('TenderAdComponent', () => {
  let component: TenderAdComponent;
  let fixture: ComponentFixture<TenderAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
