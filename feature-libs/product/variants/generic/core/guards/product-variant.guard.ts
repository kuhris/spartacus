import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import {
  Product,
  ProductScope,
  ProductService,
  SemanticPathService,
  VariantOption,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductVariantGuard implements CanActivate {
  constructor(
    protected productService: ProductService,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    const productCode = activatedRoute.params?.productCode;
    if (!productCode) {
      return of(true);
    }

    return this.productService.get(productCode, ProductScope.VARIANTS).pipe(
      filter(Boolean),
      switchMap((product: Product) => {
        if (product.variantMatrix) {
          if (!product.purchasable) {
            return of(
              this.router.createUrlTree(
                this.semanticPathService.transform({
                  cxRoute: 'product',
                  params: {
                    code: product.variantMatrix[0].variantOption.code,
                    name: product.name,
                  },
                })
              )
            );
          } else {
            return of(true);
          }
        } else {
          return of(true);
        }
      })
    );
  }

  findVariant(variants: VariantOption[]): VariantOption {
    const results: VariantOption[] = variants.filter((variant) => {
      return variant.stock && variant.stock.stockLevel ? variant : false;
    });
    return !results.length && variants.length ? variants[0] : results[0];
  }
}
