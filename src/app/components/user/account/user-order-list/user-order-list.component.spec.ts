import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderListComponent } from './user-order-list.component';

describe('UserOrderListComponent', () => {
  let component: UserOrderListComponent;
  let fixture: ComponentFixture<UserOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
