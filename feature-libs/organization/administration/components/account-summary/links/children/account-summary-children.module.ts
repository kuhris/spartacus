import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { DisableInfoModule } from '../../../shared/detail/disable-info/disable-info.module';
import { ListModule } from '../../../shared/list/list.module';
import { SubListModule } from '../../../shared/sub-list/sub-list.module';
import { AccountSummaryChildrenComponent } from './account-summary-children.component';

@NgModule({
  imports: [
    ListModule,
    I18nModule,
    RouterModule,
    SubListModule,
    CommonModule,
    DisableInfoModule,
  ],
  declarations: [AccountSummaryChildrenComponent],
})
export class AccountSummaryChildrenModule {}
