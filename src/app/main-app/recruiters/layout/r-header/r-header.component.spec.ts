import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RHeaderComponent } from './r-header.component';

describe('RHeaderComponent', () => {
  let component: RHeaderComponent;
  let fixture: ComponentFixture<RHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
