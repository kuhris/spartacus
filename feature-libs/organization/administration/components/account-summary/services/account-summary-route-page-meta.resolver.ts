import { Injectable } from '@angular/core';
import {
  AccountSummaryDocument,
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentAccountSummaryService } from './current-account-summary.service';

@Injectable({ providedIn: 'root' })
export class AccountSummaryRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentAccountSummaryService
  ) {
    console.log('called though');
    super(translation);
  }

  protected getParams(): Observable<AccountSummaryDocument> {
    console.log('is it working?');
    return this.currentItemService.item$;
  }
}
