import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantAdComponent } from './consultant-ad.component';

describe('ConsultantAdComponent', () => {
  let component: ConsultantAdComponent;
  let fixture: ComponentFixture<ConsultantAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
