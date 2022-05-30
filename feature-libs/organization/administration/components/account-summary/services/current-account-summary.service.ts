import { Injectable } from '@angular/core';
import { B2BUnit, RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentAccountSummaryService extends CurrentItemService<B2BUnit> {
  constructor(
    protected routingService: RoutingService,
    protected orgUnitService: OrgUnitService
  ) {
    super(routingService);
  }

  protected getParamKey() {
    return ROUTE_PARAMS.accountSummaryCode;
  }

  protected getItem(code: string): Observable<B2BUnit> {
    return this.orgUnitService.get(code);
  }

  getError(code: string): Observable<boolean> {
    return this.orgUnitService.getErrorState(code);
  }
}
