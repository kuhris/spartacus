import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  DisableInfoModule,
  ItemService,
} from 'feature-libs/organization/administration/components/shared';
import { SubListTestingModule } from 'feature-libs/organization/administration/components/shared/sub-list/sub-list.testing.module';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { CurrentAccountSummaryService } from '../../../services/current-account-summary.service';
import { AccountSummaryUserListService } from '../services/account-summary-user-list.service';
import { AccountSummaryUserListComponent } from './account-summary-user-list.component';

class MockUnitUserListService {}

class MockCurrentUnitService implements Partial<CurrentAccountSummaryService> {}

class MockItemService {
  current$ = of();
}

describe('UnitUserListComponent', () => {
  let component: AccountSummaryUserListComponent;
  let fixture: ComponentFixture<AccountSummaryUserListComponent>;

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
          provide: AccountSummaryUserListService,
          useClass: MockUnitUserListService,
        },
        {
          provide: CurrentAccountSummaryService,
          useClass: MockCurrentUnitService,
        },
        {
          provide: ItemService,
          useClass: MockItemService,
        },
      ],
      declarations: [AccountSummaryUserListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSummaryUserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
