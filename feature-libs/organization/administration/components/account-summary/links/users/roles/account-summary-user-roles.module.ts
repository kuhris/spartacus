import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { CardModule } from '../../../../shared/card/card.module';
import { AccountSummaryUserRolesFormComponent } from './account-summary-user-roles.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    KeyboardFocusModule,
  ],
  declarations: [AccountSummaryUserRolesFormComponent],
})
export class AccountSummaryUserRolesModule {}
