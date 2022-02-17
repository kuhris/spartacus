import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import {
  CheckoutDeliveryAddressComponent,
  CheckoutStepService,
} from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  GlobalMessageService,
  TranslationService,
  UserAddressService,
  UserCostCenterService,
} from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

export interface CardWithAddress {
  card: Card;
  address: Address;
}

@Component({
  selector: 'cx-delivery-address',
  templateUrl: './checkout-delivery-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2BCheckoutDeliveryAddressComponent
  extends CheckoutDeliveryAddressComponent
  implements OnInit, OnDestroy
{
  protected subscriptions = new Subscription();

  cards$: Observable<CardWithAddress[]>;

  isAccountPayment = false;

  costCenterAddresses$: Observable<Address[]> = this.checkoutCostCenterFacade
    .getCostCenterState()
    .pipe(
      filter((state) => !state.loading),
      map((state) => state.data),
      distinctUntilChanged(),
      switchMap((costCenter) => {
        this.doneAutoSelect = false;
        return costCenter?.code
          ? this.userCostCenterService.getCostCenterAddresses(costCenter.code)
          : of([]);
      })
    );

  constructor(
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected activatedRoute: ActivatedRoute,
    protected translationService: TranslationService,
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected globalMessageService: GlobalMessageService,
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade,
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
    protected userCostCenterService: UserCostCenterService
  ) {
    super(
      userAddressService,
      checkoutDeliveryAddressFacade,
      activatedRoute,
      translationService,
      activeCartFacade,
      checkoutStepService,
      checkoutDeliveryModesFacade,
      globalMessageService
    );
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.checkoutPaymentTypeFacade
        .isAccountPayment()
        .pipe(distinctUntilChanged())
        .subscribe((isAccount) => (this.isAccountPayment = isAccount))
    );

    super.ngOnInit();
  }

  getSupportedAddresses(): Observable<Address[]> {
    return this.checkoutPaymentTypeFacade
      .isAccountPayment()
      .pipe(
        switchMap((isAccountPayment) =>
          isAccountPayment
            ? this.costCenterAddresses$
            : super.getSupportedAddresses()
        )
      );
  }

  selectDefaultAddress(
    addresses: Address[],
    selected: Address | undefined
  ): Observable<unknown> {
    let selection$: Observable<unknown> = of();
    if (
      !this.doneAutoSelect &&
      addresses?.length &&
      (!selected || Object.keys(selected).length === 0)
    ) {
      if (this.isAccountPayment) {
        if (addresses.length === 1) {
          selection$ = this.setAddress(addresses[0]);
        }
      } else {
        selection$ = super.selectDefaultAddress(addresses, selected);
      }
      this.doneAutoSelect = true;
    }
    return selection$;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
