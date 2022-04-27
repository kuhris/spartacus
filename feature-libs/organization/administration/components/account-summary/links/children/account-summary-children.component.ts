import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ListService } from '../../../shared/list/list.service';
import { CurrentAccountSummaryService } from '../../services/current-account-summary.service';
import { AccountSummaryChildrenService } from './account-summary-children.service';

@Component({
  selector: 'cx-org-account-summary-children',
  templateUrl: './account-summary-children.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: AccountSummaryChildrenService,
    },
  ],
})
export class AccountSummaryChildrenComponent {
  unit$: Observable<B2BUnit> = this.currentUnitService
    ? this.currentUnitService.item$
    : of({ active: true });

  constructor(protected currentUnitService: CurrentAccountSummaryService) {}
}
