import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CostCenterFormModule } from '../../../../cost-center/form/cost-center-form.module';
import { AccountSummaryCostCenterCreateComponent } from './account-summary-cost-center-create.component';

@NgModule({
  imports: [CommonModule, CostCenterFormModule],
  declarations: [AccountSummaryCostCenterCreateComponent],
})
export class AccountSummaryCostCenterCreateModule {}
