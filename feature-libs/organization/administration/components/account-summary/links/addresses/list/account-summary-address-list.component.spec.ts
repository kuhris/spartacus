import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { SubListTestingModule } from 'feature-libs/organization/administration/components/shared/sub-list/sub-list.testing.module';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { AccountSummaryAddressListComponent } from './account-summary-address-list.component';
import { AccountSummaryAddressListService } from './account-summary-address-list.service';

class MockAccountSummaryAddressListService {}

describe('AccountSummaryAddressListComponent', () => {
  let component: AccountSummaryAddressListComponent;
  let fixture: ComponentFixture<AccountSummaryAddressListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubListTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: AccountSummaryAddressListService,
          useClass: MockAccountSummaryAddressListService,
        },
      ],
      declarations: [AccountSummaryAddressListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSummaryAddressListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
