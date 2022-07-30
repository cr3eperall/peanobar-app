import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSelectorComponent } from './img-selector.component';

describe('ImgSelectorComponent', () => {
  let component: ImgSelectorComponent;
  let fixture: ComponentFixture<ImgSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
