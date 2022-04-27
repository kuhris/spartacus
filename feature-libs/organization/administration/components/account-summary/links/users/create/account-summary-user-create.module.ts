import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserFormModule } from '../../../../user/form/user-form.module';
import { AccountSummaryUserCreateComponent } from './account-summary-user-create.component';

@NgModule({
  imports: [CommonModule, UserFormModule],
  declarations: [AccountSummaryUserCreateComponent],
})
export class AccountSummaryUserCreateModule {}
