import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterBrowseComponent } from './recruiter-browse.component';

describe('RecruiterBrowseComponent', () => {
  let component: RecruiterBrowseComponent;
  let fixture: ComponentFixture<RecruiterBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterBrowseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
