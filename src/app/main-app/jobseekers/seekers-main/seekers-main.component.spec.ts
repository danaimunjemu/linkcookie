import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekersMainComponent } from './seekers-main.component';

describe('SeekersMainComponent', () => {
  let component: SeekersMainComponent;
  let fixture: ComponentFixture<SeekersMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekersMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekersMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
