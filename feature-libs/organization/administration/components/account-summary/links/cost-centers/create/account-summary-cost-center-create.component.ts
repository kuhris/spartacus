import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CostCenterItemService } from '../../../../cost-center/services/cost-center-item.service';
import { CurrentAccountSummaryService } from '../../../services/current-account-summary.service';
import { AccountSummaryCostCenterItemService } from './account-summary-cost-center-item.service';

@Component({
  selector: 'cx-org-account-summary-cost-center-create',
  templateUrl: './account-summary-cost-center-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    // we provide a specific version of the `CostCenterItemService` to
    // let the form component work with unit cost centers.
    {
      provide: CostCenterItemService,
      useExisting: AccountSummaryCostCenterItemService,
    },
  ],
})
export class AccountSummaryCostCenterCreateComponent {
  unitKey$: Observable<string> = this.unitService.key$;
  constructor(protected unitService: CurrentAccountSummaryService) {}
}
