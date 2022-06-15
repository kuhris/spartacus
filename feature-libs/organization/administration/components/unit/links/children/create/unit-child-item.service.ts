import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { B2BUnit, RoutingService } from '@spartacus/core';
import {
  OrgUnitService,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { UnitFormService } from '../../../form/unit-form.service';
import { UnitItemService } from '../../../services/unit-item.service';
import { CurrentUnitChildService } from './current-unit-child.service';
import {AccountSummaryService} from "../../../../../core/services/account-summary.service";

@Injectable({
  providedIn: 'root',
})
export class UnitChildItemService extends UnitItemService {
  constructor(
    protected currentItemService: CurrentUnitChildService,
    protected routingService: RoutingService,
    protected formService: UnitFormService,
    protected unitService: OrgUnitService,
    protected accountSummaryService: AccountSummaryService,
  ) {
    super(currentItemService, routingService, formService, unitService, accountSummaryService);
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
