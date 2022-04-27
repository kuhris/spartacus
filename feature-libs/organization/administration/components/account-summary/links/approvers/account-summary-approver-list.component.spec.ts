import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { AccountSummaryApproverListComponent } from './account-summary-approver-list.component';
import { AccountSummaryApproverListService } from './account-summary-approver-list.service';

class MockAccountSummaryApproverListService {}

describe('AccountSummaryApproverListComponent', () => {
  let component: AccountSummaryApproverListComponent;
  let fixture: ComponentFixture<AccountSummaryApproverListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubListTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: AccountSummaryApproverListService,
          useClass: MockAccountSummaryApproverListService,
        },
      ],
      declarations: [AccountSummaryApproverListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSummaryApproverListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
