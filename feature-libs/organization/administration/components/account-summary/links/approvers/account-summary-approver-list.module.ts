import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { SubListModule } from '../../../shared/sub-list/sub-list.module';
import { AccountSummaryAssignedApproverListComponent } from './assigned/account-summary-assigned-approver-list.component';
import { AccountSummaryApproverListComponent } from './account-summary-approver-list.component';

@NgModule({
  imports: [I18nModule, RouterModule, SubListModule],
  declarations: [AccountSummaryApproverListComponent, UnitAssignedApproverListComponent],
})
export class AccountSummaryApproverListModule {}
