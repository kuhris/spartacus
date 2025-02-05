import { Provider } from '@angular/core';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CheckoutCostCenterService } from './checkout-cost-center.service';
import { CheckoutPaymentTypeService } from './checkout-payment-type.service';

export const facadeProviders: Provider[] = [
  CheckoutCostCenterService,
  {
    provide: CheckoutCostCenterFacade,
    useExisting: CheckoutCostCenterService,
  },
  CheckoutPaymentTypeService,
  {
    provide: CheckoutPaymentTypeFacade,
    useExisting: CheckoutPaymentTypeService,
  },
];
