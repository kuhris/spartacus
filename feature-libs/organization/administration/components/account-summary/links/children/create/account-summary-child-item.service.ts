import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { B2BUnit, RoutingService } from '@spartacus/core';
import {
  OrgUnitService,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { AccountSummaryFormService } from '../../../form/account-summary-form.service';
import { AccountSummaryItemService } from '../../../services/account-summary-item.service';
import { CurrentAccountSummaryChildService } from './current-account-summary-child.service';

@Injectable({
  providedIn: 'root',
})
export class AccountSummaryChildItemService extends AccountSummaryItemService {
  constructor(
    protected currentItemService: CurrentAccountSummaryChildService,
    protected routingService: RoutingService,
    protected formService: AccountSummaryFormService,
    protected unitService: OrgUnitService
  ) {
    super(currentItemService, routingService, formService, unitService);
  }

  save(
    form: FormGroup,
    key?: string
  ): Observable<OrganizationItemStatus<B2BUnit>> {
    // we enable the parentOrgUnit temporarily so that the underlying
    // save method can read the complete form.value.
    form.get('parentOrgUnit')?.enable();
    return super.save(form, key);
  }

  /**
   * @override
   * Returns 'unitDetails'
   */
  protected getDetailsRoute(): string {
    return 'orgUnitChildren';
  }

  protected buildRouteParams(item: B2BUnit) {
    return { uid: item.parentOrgUnit.uid };
  }
}
