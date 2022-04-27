import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { ListService } from '../../../../shared/list/list.service';
import { AccountSummaryAddressListService } from './account-summary-address-list.service';

@Component({
  selector: 'cx-org-account-summary-address-list',
  templateUrl: './account-summary-address-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: AccountSummaryAddressListService,
    },
  ],
})
export class AccountSummaryAddressListComponent {
  routerKey = ROUTE_PARAMS.addressCode;
}
