import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { ItemService } from '../../../shared';
import { DisableInfoModule } from '../../../shared/detail/disable-info/disable-info.module';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { CurrentAccountSummaryService } from '../../services/current-account-summary.service';
import { AccountSummaryCostCenterListComponent } from './account-summary-cost-centers.component';
import { AccountSummaryCostCenterListService } from './account-summary-cost-centers.service';

class MockAccountSummaryCostCenterListService {}

class MockCurrentAccountSummaryService implements Partial<CurrentAccountSummaryService> {}

class MockItemService {
  current$ = of();
}

describe('AccountSummaryCostCenterListComponent', () => {
  let component: AccountSummaryCostCenterListComponent;
  let fixture: ComponentFixture<AccountSummaryCostCenterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SubListTestingModule,
        UrlTestingModule,
        I18nTestingModule,
        DisableInfoModule,
      ],
      providers: [
        {
          provide: AccountSummaryCostCenterListService,
          useClass: MockAccountSummaryCostCenterListService,
        },
        {
          provide: CurrentAccountSummaryService,
          useClass: MockCurrentAccountSummaryService,
        },
        {
          provide: ItemService,
          useClass: MockItemService,
        },
      ],
      declarations: [AccountSummaryCostCenterListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSummaryCostCenterListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
