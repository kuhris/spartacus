import { NgModule } from '@angular/core';
import { AccountSummaryAddressDetailsModule } from './details/account-summary-address-details.module';
import { AccountSummaryAddressListModule } from './list/account-summary-address-list.module';
import { AccountSummaryAddressFormModule } from './form/account-summary-address-form.module';

@NgModule({
  imports: [
    AccountSummaryAddressListModule,
    AccountSummaryAddressDetailsModule,
    AccountSummaryAddressFormModule,
  ],
})
export class AccountSummaryAddressModule {}
