import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditOverlayComponent } from './account-edit-overlay.component';

describe('AccountEditOverlayComponent', () => {
  let component: AccountEditOverlayComponent;
  let fixture: ComponentFixture<AccountEditOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountEditOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountEditOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
