import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../../../shared/list/list.service';
import { AccountSummaryAssignedApproverListService } from './account-summary-assigned-approver-list.service';

@Component({
  selector: 'cx-org-account-summary-assigned-approver-list',
  templateUrl: './account-summary-assigned-approver-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: AccountSummaryAssignedApproverListService,
    },
  ],
})
export class AccountSummaryAssignedApproverListComponent {}
