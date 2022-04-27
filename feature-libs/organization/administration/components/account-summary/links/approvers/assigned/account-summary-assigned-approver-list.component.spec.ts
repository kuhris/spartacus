import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { SubListTestingModule } from 'feature-libs/organization/administration/components/shared/sub-list/sub-list.testing.module';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { AccountSummaryAssignedApproverListComponent } from './account-summary-assigned-approver-list.component';
import { AccountSummaryAssignedApproverListService } from './account-summary-assigned-approver-list.service';

class MockUnitAssignedApproverListService {}

describe('AccountSummaryAssignedApproverListComponent', () => {
  let component: AccountSummaryAssignedApproverListComponent;
  let fixture: ComponentFixture<AccountSummaryAssignedApproverListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubListTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: AccountSummaryAssignedApproverListService,
          useClass: MockUnitAssignedApproverListService,
        },
      ],
      declarations: [AccountSummaryAssignedApproverListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSummaryAssignedApproverListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
