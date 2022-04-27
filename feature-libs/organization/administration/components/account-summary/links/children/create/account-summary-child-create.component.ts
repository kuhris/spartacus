import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentAccountSummaryService } from '../../../services/current-account-summary.service';
import { AccountSummaryItemService } from '../../../services/account-summary-item.service';
import { AccountSummaryChildItemService } from './account-summary-child-item.service';

@Component({
  selector: 'cx-org-unit-child-create',
  templateUrl: './account-summary-child-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    // we provide a specific version of the `AccountSummaryItemService` to
    // let the form component work with child units.
    {
      provide: AccountSummaryItemService,
      useExisting: AccountSummaryChildItemService,
    },
  ],
})
export class AccountSummaryChildCreateComponent {
  unitKey$: Observable<string> = this.unitService.key$;
  constructor(protected accountSummaryService: CurrentAccountSummaryService) {}
}
