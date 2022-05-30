import { Injectable } from '@angular/core';
import { Address, RoutingService } from '@spartacus/core';
import {
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, first, pluck } from 'rxjs/operators';
import { ItemService } from '../../../../shared/item.service';
import { AccountSummaryAddressFormService } from '../form/account-summary-address-form.service';
import { CurrentAccountSummaryAddressService } from './current-account-summary-address.service';

@Injectable({
  providedIn: 'root',
})
export class AccountSummaryAddressItemService extends ItemService<Address> {
  constructor(
    protected currentItemService: CurrentAccountSummaryAddressService,
    protected routingService: RoutingService,
    protected formService: AccountSummaryAddressFormService,
    protected unitService: OrgUnitService
  ) {
    super(currentItemService, routingService, formService);
  }

  protected unitRouteParam$ = this.routingService
    .getParams()
    .pipe(pluck(ROUTE_PARAMS.accountSummaryCode), distinctUntilChanged());

  load(unitUid: string, addressId: string): Observable<Address> {
    return this.unitService
      .getAddress(unitUid, addressId)
      .pipe(filter((list) => Boolean(list)));
  }

  update(
    addressCode: string,
    address: Address
  ): Observable<OrganizationItemStatus<Address>> {
    this.unitRouteParam$.pipe(first()).subscribe((accountSummaryCode) => {
      this.accountSummaryService.updateAddress(accountSummaryCode, addressCode, address);
    });
    return this.unitService.getAddressLoadingStatus(addressCode);
  }

  protected create(
    value: Address
  ): Observable<OrganizationItemStatus<Address>> {
    this.unitRouteParam$
      .pipe(first())
      .subscribe((accountSummaryCode) => this.accountSummaryService.createAddress(accountSummaryCode, value));
    return this.unitService.getAddressLoadingStatus(null);
  }

  protected getDetailsRoute(): string {
    return this.currentItemService.getDetailsRoute();
  }

  delete(
    addressId: string,
    unitUid: string
  ): Observable<OrganizationItemStatus<Address>> {
    this.launchList();
    this.unitService.deleteAddress(unitUid, addressId);
    return this.unitService.getAddressLoadingStatus(addressId);
  }

  launchDetails(item: Address): void {
    if (!item.id) {
      // since the ID is generated in the backend
      // we redirect to the list instead.
      this.launchList();
    } else {
      this.accountSummaryRouteParam$.pipe(first()).subscribe((accountSummaryCode) => {
        this.routingService.go({
          cxRoute: this.getDetailsRoute(),
          params: { ...item, uid: accountSummaryCode },
        });
      });
    }
  }

  protected launchList() {
    this.accountSummaryRouteParam$.pipe(first()).subscribe((accountSummaryCode) => {
      this.routingService.go({
        cxRoute: 'orgUnitAddressList',
        params: { uid: accountSummaryCode },
      });
    });
  }
}
