import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderToprocessComponent } from './order-toprocess.component';

describe('OrderToprocessComponent', () => {
  let component: OrderToprocessComponent;
  let fixture: ComponentFixture<OrderToprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderToprocessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderToprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
