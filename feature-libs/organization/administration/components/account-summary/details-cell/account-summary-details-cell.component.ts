import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CellComponent } from '../../shared';

@Component({
  selector: 'cx-org-unit-details-cell',
  templateUrl: './account-summary-details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSummaryDetailsCellComponent extends CellComponent {}
