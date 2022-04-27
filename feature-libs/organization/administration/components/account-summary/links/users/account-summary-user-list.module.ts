import { NgModule } from '@angular/core';
import { AccountSummaryUserListModule } from './list/account-summary-user-list.module';
import { AccountSummaryUserRolesModule } from './roles/account-summary-user-roles.module';

@NgModule({
  imports: [AccountSummaryUserListModule, AccountSummaryUserRolesModule],
})
export class AccountSummaryUsersModule {}
