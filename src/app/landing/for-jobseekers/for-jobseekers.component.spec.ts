import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForJobseekersComponent } from './for-jobseekers.component';

describe('ForJobseekersComponent', () => {
  let component: ForJobseekersComponent;
  let fixture: ComponentFixture<ForJobseekersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForJobseekersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForJobseekersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
