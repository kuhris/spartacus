import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ListService } from '../../../shared/list/list.service';
import { CurrentAccountSummaryService } from '../../services/current-account-summary.service';
import { AccountSummaryCostCenterListService } from './account-summary-cost-centers.service';

@Component({
  selector: 'cx-org-account-summary-cost-centers',
  templateUrl: './account-summary-cost-centers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: AccountSummaryCostCenterListService,
    },
  ],
})
export class AccountSummaryCostCenterListComponent {
  unit$: Observable<B2BUnit> = this.currentAccountSummaryService
    ? this.currentAccountSummaryService.item$
    : of({ active: true });

  constructor(protected currentAccountSummaryService: CurrentAccountSummaryService) {}
}
