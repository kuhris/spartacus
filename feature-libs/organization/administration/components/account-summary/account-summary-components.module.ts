import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
// import { AccountSummaryDetailsModule } from './details/account-summary-details.module';
// import { AccountSummaryFormModule } from './form/account-summary-form.module';
// import { AccountSummaryAddressModule } from './links/addresses/account-summary-address.module';
// import { AccountSummaryApproverListModule } from './links/approvers/account-summary-approver-list.module';
// import { AccountSummaryChildrenModule } from './links/children/account-summary-children.module';
// import { AccountSummaryCostCenterListModule } from './links/cost-centers/account-summary-cost-centers.module';
// import { AccountSummaryUsersModule } from './links/users/account-summary-user-list.module';
import { AccountSummaryListModule } from './list/account-summary-list.module';
import { accountSummaryCmsConfig, accountSummaryTableConfigFactory } from './account-summary.config';
import { UnitListModule } from "../unit/list/unit-list.module";

@NgModule({
  imports: [
    RouterModule,
    AccountSummaryListModule,
    UnitListModule,
    // AccountSummaryDetailsModule,
    // AccountSummaryFormModule,
    // AccountSummaryChildrenModule,
    // AccountSummaryApproverListModule,
    // AccountSummaryUsersModule,
    // AccountSummaryCostCenterListModule,
    // AccountSummaryAddressModule,
  ],
  providers: [
    provideDefaultConfig(accountSummaryCmsConfig),
    provideDefaultConfigFactory(accountSummaryTableConfigFactory),
  ],
})
export class AccountSummaryComponentsModule {}
