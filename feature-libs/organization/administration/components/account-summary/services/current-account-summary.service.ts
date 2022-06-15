import { Injectable } from '@angular/core';
import { AccountSummaryDocument,
  // B2BUnit,
  RoutingService,
  EntitiesModel,
 } from '@spartacus/core';
import { AccountSummaryService } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentAccountSummaryService extends CurrentItemService<AccountSummaryDocument> {
  constructor(
    protected routingService: RoutingService,
    protected orgAccountSummaryService: AccountSummaryService
    // protected orgUnitService: OrgUnitService
  ) {
    super(routingService);
  }

  protected getParamKey() {
    return ROUTE_PARAMS.accountSummaryCode;
  }

  protected getItem(code: string): Observable<AccountSummaryDocument> {
    const accountSummaryParams = {
      pageSize: 10,
      b2bUnitCode: code,
    } as any;
    return this.orgAccountSummaryService.getList(accountSummaryParams).pipe(
      map((accountSummaryDocumentEntitiesModel: EntitiesModel<AccountSummaryDocument>) => accountSummaryDocumentEntitiesModel.values[0])
    );
    // return this.orgAccountSummaryService.get(code);
  }

  getError(code: string): Observable<boolean> {
    console.log('there was an error', code);
    return of(code ? false : true);
    // return this.orgAccountSummaryService.getErrorState(code);
  }
}
