import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTrialComponent } from './crud-trial.component';

describe('CrudTrialComponent', () => {
  let component: CrudTrialComponent;
  let fixture: ComponentFixture<CrudTrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudTrialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
