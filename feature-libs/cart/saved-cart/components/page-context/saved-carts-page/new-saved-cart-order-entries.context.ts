import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { CartActions, ProductImportInfoService } from '@spartacus/cart/base/core';
import {
  AddOrderEntriesContext,
  Cart,
  MultiCartFacade,
  OrderEntriesSource,
  ProductData,
  ProductImportInfo,
} from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { UserIdService } from '@spartacus/core';
import { Observable, of, queueScheduler, throwError } from 'rxjs';
import {
  bufferCount,
  concatMap,
  delayWhen,
  filter,
  map,
  observeOn,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewSavedCartOrderEntriesContext implements AddOrderEntriesContext {
  readonly type = OrderEntriesSource.NEW_SAVED_CART;

  constructor(
    protected importInfoService: ProductImportInfoService,
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartFacade,
    protected savedCartService: SavedCartFacade,
    private actionsSubject: ActionsSubject
  ) {}

  addEntries(
    products: ProductData[],
    savedCartInfo?: { name: string; description: string }
  ): Observable<Array<ProductImportInfo>> {
    return this.add(products, savedCartInfo).pipe(
      switchMap(
        (cartId: string) =>
          this.importInfoService.getResults(cartId).pipe(
            bufferCount(products.length),
            take(1),
            map(productInfo => ({ productInfo, cartId }))
          )
      ),
      concatMap(({ productInfo, cartId }) => {
        if (productInfo.every(s => s.statusCode === 'unknownError' || s.statusCode === 'unknownIdentifier')) {
          this.savedCartService.deleteSavedCart(cartId);
          return this.actionsSubject.pipe(
            ofType(CartActions.DELETE_CART_SUCCESS),
            filter((action: CartActions.DeleteCartSuccess) => action.payload.cartId === cartId),
            take(1),
            concatMap(() => throwError(productInfo))
          );
        }
        return of(productInfo);
      })
    );
  }

  protected add(
    products: ProductData[],
    savedCartInfo?: { name: string; description: string }
  ): Observable<string> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId: string) =>
        this.multiCartService
          .createCart({
            userId,
            extraData: { active: false },
          })
          .pipe(
            map((cart: Cart) => cart.code as string),
            tap((cartId: string) => {
              this.savedCartService.saveCart({
                cartId,
                saveCartName: savedCartInfo?.name,
                saveCartDescription: savedCartInfo?.description,
              });
              this.savedCartService.loadSavedCarts();
            }),
            observeOn(queueScheduler),
            delayWhen(() =>
              this.savedCartService
                .getSaveCartProcessLoading()
                .pipe(filter((loading) => !loading))
            ),
            tap((cartId: string) =>
              this.multiCartService.addEntries(userId, cartId, products)
            )
          )
      )
    );
  }
}
