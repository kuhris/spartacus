import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../../shared/list/list.service';
import { AccountSummaryApproverListService } from './account-summary-approver-list.service';

@Component({
  selector: 'cx-org-account-summary-approver-list',
  templateUrl: './account-summary-approver-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: AccountSummaryApproverListService,
    },
  ],
})
export class AccountSummaryApproverListComponent {}
