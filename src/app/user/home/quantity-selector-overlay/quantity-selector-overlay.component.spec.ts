import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitySelectorOverlayComponent } from './quantity-selector-overlay.component';

describe('QuantitySelectorOverlayComponent', () => {
  let component: QuantitySelectorOverlayComponent;
  let fixture: ComponentFixture<QuantitySelectorOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantitySelectorOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantitySelectorOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
