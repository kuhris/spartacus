import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { AccountSummaryDetailsModule } from './details/account-summary-details.module';
import { AccountSummaryFormModule } from './form/account-summary-form.module';
import { AccountSummaryAddressModule } from './links/addresses/account-summary-address.module';
import { AccountSummaryApproverListModule } from './links/approvers/account-summary-approver-list.module';
import { AccountSummaryChildrenModule } from './links/children/account-summary-children.module';
import { UnitCostCenterListModule } from './links/cost-centers/account-summary-cost-centers.module';
import { UnitUsersModule } from './links/users/account-summary-user-list.module';
import { AccountSummaryListModule } from './list/account-summary-list.module';
import { unitsCmsConfig, unitsTableConfigFactory } from './account-summary.config';

@NgModule({
  imports: [
    RouterModule,
    AccountSummaryListModule,
    AccountSummaryDetailsModule,
    AccountSummaryFormModule,
    AccountSummaryChildrenModule,
    AccountSummaryApproverListModule,
    UnitUsersModule,
    UnitCostCenterListModule,
    AccountSummaryAddressModule,
  ],
  providers: [
    provideDefaultConfig(unitsCmsConfig),
    provideDefaultConfigFactory(unitsTableConfigFactory),
  ],
})
export class AccountSummaryComponentsModule {}
