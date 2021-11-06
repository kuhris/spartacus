import { Injectable } from '@angular/core';
import {
  CardType,
  facadeFactory,
  PaymentDetails,
  QueryState,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutPaymentFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: [
        'getCardTypesState',
        'getCardTypes',
        'getPaymentDetailsState',
        'createPaymentDetails',
        'setPaymentDetails',
      ],
      async: true,
    }),
})
export abstract class CheckoutPaymentFacade {
  /**
   * Returns the card types state
   */
  abstract getCardTypesState(): Observable<QueryState<CardType[] | undefined>>;
  /**
   * Returns the card types
   */
  abstract getCardTypes(): Observable<CardType[]>;
  /**
   * Returns the payment details state
   */
  abstract getPaymentDetailsState(): Observable<
    QueryState<PaymentDetails | undefined>
  >;
  /**
   * Creates the payment details using the provided paymentDetails
   */
  abstract createPaymentDetails(
    paymentDetails: PaymentDetails
  ): Observable<unknown>;
  /**
   * Sets the payment details to the current cart
   */
  abstract setPaymentDetails(
    paymentDetails: PaymentDetails
  ): Observable<unknown>;
}
