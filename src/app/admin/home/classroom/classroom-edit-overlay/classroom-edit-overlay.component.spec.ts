import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomEditOverlayComponent } from './classroom-edit-overlay.component';

describe('ClassroomEditOverlayComponent', () => {
  let component: ClassroomEditOverlayComponent;
  let fixture: ComponentFixture<ClassroomEditOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomEditOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomEditOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
