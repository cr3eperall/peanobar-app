import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOverlayComponent } from './order-overlay.component';

describe('OrderOverlayComponent', () => {
  let component: OrderOverlayComponent;
  let fixture: ComponentFixture<OrderOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
