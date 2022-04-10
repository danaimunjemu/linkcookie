import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterMainComponent } from './recruiter-main.component';

describe('RecruiterMainComponent', () => {
  let component: RecruiterMainComponent;
  let fixture: ComponentFixture<RecruiterMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
