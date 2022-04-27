import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountSummaryFormModule } from '../../../form/account-summary-form.module';
import { AccountSummaryChildCreateComponent } from './account-summary-child-create.component';

@NgModule({
  imports: [CommonModule, AccountSummaryFormModule],
  declarations: [AccountSummaryChildCreateComponent],
})
export class AccountSummaryChildCreateModule {}
