import { Injectable } from '@angular/core';
import { B2BUnit, RoutingService } from '@spartacus/core';
import {
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { UnitFormService } from '../form/unit-form.service';
import { CurrentUnitService } from './current-unit.service';
import {AccountSummaryService} from "../../../core/services/account-summary.service";

@Injectable({
  providedIn: 'root',
})
export class UnitItemService extends ItemService<B2BUnit> {
  constructor(
    protected currentItemService: CurrentUnitService,
    protected routingService: RoutingService,
    protected formService: UnitFormService,
    protected unitService: OrgUnitService,
    protected accountSummaryService: AccountSummaryService,
  ) {
    debugger;
    super(currentItemService, routingService, formService);
  }

  /**
   * @override
   * Returns the unit for the given code.
   *
   * Loads the unit each time, to ensure accurate data is resolved.
   */
  load(code: string): Observable<B2BUnit> {
    console.log('ttest');
    this.unitService.load(code);
    const accountSummaryParams = {
      pageSize: 10,
      b2bUnitCode: code,
    } as any;
    this.accountSummaryService.loadAccountSummaryDocuments(accountSummaryParams);
    console.log('calling just do it', code);
    this.accountSummaryService.getList(accountSummaryParams).subscribe(justDoIt => {
      console.log('Just Do It', justDoIt);
    })
    const usg = this.unitService.get(code);
    usg.subscribe(tada => {
      console.log('Tada', tada);
    })
    return usg;
  }

  update(code, value: B2BUnit): Observable<OrganizationItemStatus<B2BUnit>> {
    this.unitService.update(code, value);
    return this.unitService.getLoadingStatus(value.uid);
  }

  protected create(
    value: B2BUnit
  ): Observable<OrganizationItemStatus<B2BUnit>> {
    this.unitService.create(value);
    return this.unitService.getLoadingStatus(value.uid);
  }

  /**
   * @override
   * Returns 'unitDetails'
   */
  protected getDetailsRoute(): string {
    return 'orgUnitDetails';
  }
}
