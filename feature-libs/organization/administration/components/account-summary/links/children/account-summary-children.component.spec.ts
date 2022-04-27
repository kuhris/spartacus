import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { ItemService } from '../../../shared';
import { DisableInfoModule } from '../../../shared/detail/disable-info/disable-info.module';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { CurrentAccountSummaryService } from '../../services/current-account-summary.service';
import { AccountSummaryChildrenComponent } from './account-summary-children.component';
import { AccountSummaryChildrenService } from './account-summary-children.service';

class MockAccountSummaryChildrenService {}

class MockCurrentAccountSummaryService implements Partial<CurrentAccountSummaryService> {}

class MockItemService {
  current$ = of();
}

describe('AccountSummaryChildrenComponent', () => {
  let component: AccountSummaryChildrenComponent;
  let fixture: ComponentFixture<AccountSummaryChildrenComponent>;

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
          provide: AccountSummaryChildrenService,
          useClass: MockAccountSummaryChildrenService,
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
      declarations: [AccountSummaryChildrenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSummaryChildrenComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
