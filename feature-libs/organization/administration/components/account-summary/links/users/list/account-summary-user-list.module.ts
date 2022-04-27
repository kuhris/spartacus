import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { DisableInfoModule } from '../../../../shared/detail/disable-info/disable-info.module';
import { SubListModule } from '../../../../shared/sub-list/sub-list.module';
import { UnitUserRolesCellComponent } from './account-summary-user-link-cell.component';
import { AccountSummaryUserListComponent } from './account-summary-user-list.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    UrlModule,
    SubListModule,
    DisableInfoModule,
  ],
  declarations: [AccountSummaryUserListComponent, UnitUserRolesCellComponent],
})
export class AccountSummaryUserListModule {}
