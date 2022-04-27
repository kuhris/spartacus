import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserItemService } from '../../../../user/services/user-item.service';
import { CurrentAccountSummaryService } from '../../../services/current-account-summary.service';
import { AccountSummaryUserItemService } from './account-summary-user-item.service';

@Component({
  selector: 'cx-org-unit-user-create',
  templateUrl: './account-summary-user-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    // we provide a specific version of the `AccountSummaryItemService` to
    // let the form component work with child units.
    {
      provide: UserItemService,
      useExisting: AccountSummaryUserItemService,
    },
  ],
})
export class AccountSummaryUserCreateComponent {
  unitKey$: Observable<string> = this.unitService.key$;
  constructor(protected unitService: CurrentAccountSummaryService) {}
}
