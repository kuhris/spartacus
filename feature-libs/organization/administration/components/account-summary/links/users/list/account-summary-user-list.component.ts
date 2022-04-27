import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable, of } from 'rxjs';
import { ListService } from '../../../../shared/list/list.service';
import { CurrentAccountSummaryService } from '../../../services/current-account-summary.service';
import { AccountSummaryUserListService } from '../services/account-summary-user-list.service';

@Component({
  selector: 'cx-org-unit-user-list',
  templateUrl: './account-summary-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: AccountSummaryUserListService,
    },
  ],
})
export class AccountSummaryUserListComponent {
  routerKey = ROUTE_PARAMS.userCode;

  unit$: Observable<B2BUnit> = this.currentUnitService
    ? this.currentUnitService.item$
    : of({ active: true });

  constructor(protected currentUnitService: CurrentAccountSummaryService) {}
}
