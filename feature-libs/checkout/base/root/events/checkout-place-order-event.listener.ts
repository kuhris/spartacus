import { Injectable, OnDestroy } from '@angular/core';
import { RemoveCartEvent } from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { Subscription } from 'rxjs';
import { CheckoutQueryResetEvent } from './checkout.events';

@Injectable({
  providedIn: 'root',
})
export class CheckoutPlaceOrderEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
    this.onOrderPlaced();
  }

  protected onOrderPlaced(): void {
    this.subscriptions.add(
      this.eventService
        .get(OrderPlacedEvent)
        .subscribe(({ userId, cartId, cartCode }) => {
          this.eventService.dispatch({}, CheckoutQueryResetEvent);

          this.eventService.dispatch(
            {
              userId,
              cartId,
              cartCode,
            },
            RemoveCartEvent
          );
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
