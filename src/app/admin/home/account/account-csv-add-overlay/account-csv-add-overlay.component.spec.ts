import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCsvAddOverlayComponent } from './account-csv-add-overlay.component';

describe('AccountCsvAddOverlayComponent', () => {
  let component: AccountCsvAddOverlayComponent;
  let fixture: ComponentFixture<AccountCsvAddOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCsvAddOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCsvAddOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
