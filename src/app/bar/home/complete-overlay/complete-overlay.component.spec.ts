import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteOverlayComponent } from './complete-overlay.component';

describe('CompleteOverlayComponent', () => {
  let component: CompleteOverlayComponent;
  let fixture: ComponentFixture<CompleteOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
