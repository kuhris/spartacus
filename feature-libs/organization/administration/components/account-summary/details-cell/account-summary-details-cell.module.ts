import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { PopoverModule } from '@spartacus/storefront';
import { AccountSummaryDetailsCellComponent } from './account-summary-details-cell.component';

@NgModule({
  imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule],
  declarations: [AccountSummaryDetailsCellComponent],
  exports: [AccountSummaryDetailsCellComponent],
})
export class AccountSummaryDetailsCellModule {}
