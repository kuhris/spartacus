/*
import { Injectable } from '@angular/core';
import { B2BUnit, RoutingService } from '@spartacus/core';
import {
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { AccountSummaryFormService } from '../form/account-summary-form.service';
import { CurrentAccountSummaryService } from './current-account-summary.service';

@Injectable({
  providedIn: 'root',
})
export class AccountSummaryItemService extends ItemService<B2BUnit> {
  constructor(
    protected currentItemService: CurrentAccountSummaryService,
    protected routingService: RoutingService,
    protected formService: AccountSummaryFormService,
    protected unitService: OrgUnitService
  ) {
    debugger;
    super(currentItemService, routingService, formService);
  }
 */

  /**
   * @override
   * Returns the unit for the given code.
   *
   * Loads the unit each time, to ensure accurate data is resolved.
   */
  /*
  load(code: string): Observable<B2BUnit> {
    this.unitService.load(code);
    return this.unitService.get(code);
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
   */

  /**
   * @override
   * Returns 'unitDetails'
   */
  /*
  protected getDetailsRoute(): string {
    return 'orgAccountSummaryDetails';
  }
}
   */

import { Injectable } from '@angular/core';
import { AccountSummaryDocument,
  EntitiesModel,
  RoutingService } from '@spartacus/core';
import {
  OrganizationItemStatus,
  // OrgUnitService,
  AccountSummaryService
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
// import { UnitFormService } from '../../unit/form/unit-form.service';
import { AccountSummaryFormService } from '../form/account-summary-form.service';
import { CurrentAccountSummaryService } from '../services/current-account-summary.service';
  // ' ../../unit/services/current-unit.service';
// import {AccountSummaryService} from "../../../core/services/account-summary.service";

@Injectable({
  providedIn: 'root',
})
export class AccountSummaryItemService extends ItemService<AccountSummaryDocument> {
  constructor(
    protected currentItemService: CurrentAccountSummaryService,
    protected routingService: RoutingService,
    protected formService: AccountSummaryFormService,
    protected unitService: AccountSummaryService,
    protected accountSummaryService: AccountSummaryService,
  ) {
    debugger;
    super(currentItemService, routingService, formService as any);
  }

  /**
   * @override
   * Returns the unit for the given code.
   *
   * Loads the unit each time, to ensure accurate data is resolved.
   */
  load(code: string): Observable<AccountSummaryDocument> {
    console.log('ttest account-summary-item.service');
    // this.routingService.getParams().subscribe(lala => console.log('lala', lala));
    // this.unitService.load(code);
    const accountSummaryParams = {
      pageSize: 10,
      b2bUnitCode: code,
    } as any;
    this.accountSummaryService.loadAccountSummaryDocuments(accountSummaryParams);
    console.log('calling just do it');
    const accountSummaryDocumentEntitiesModel = this.accountSummaryService.getList(accountSummaryParams);
    accountSummaryDocumentEntitiesModel.subscribe(justDoIt => {
      console.log('Just Do It', justDoIt);
    });
    return accountSummaryDocumentEntitiesModel.pipe(
      map((entitiesModel: EntitiesModel<AccountSummaryDocument>) => entitiesModel.values[0])
    );
    // this.accountSummaryService.get()
    // const usg = this.unitService.get(code);
    // usg.subscribe(tada => {
    //   console.log('Tada', tada);
    // })

    // return usg;
  }

  update(code, value: AccountSummaryDocument): Observable<OrganizationItemStatus<AccountSummaryDocument>> {
    this.unitService.update(code, value);
    return this.unitService.getLoadingStatus(value.documentNumber);
  }

  protected create(
    value: AccountSummaryDocument
  ): Observable<OrganizationItemStatus<AccountSummaryDocument>> {
    this.unitService.create(value);
    return this.unitService.getLoadingStatus(value.documentNumber);
  }

  /**
   * @override
   * Returns 'unitDetails'
   */
  protected getDetailsRoute(): string {
    console.log('this and that');
    return 'orgAccountSummaryDetails';
  }
}
