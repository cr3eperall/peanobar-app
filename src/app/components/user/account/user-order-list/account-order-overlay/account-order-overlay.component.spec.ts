import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderOverlayComponent } from './account-order-overlay.component';

describe('AccountOrderOverlayComponent', () => {
  let component: AccountOrderOverlayComponent;
  let fixture: ComponentFixture<AccountOrderOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOrderOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOrderOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
