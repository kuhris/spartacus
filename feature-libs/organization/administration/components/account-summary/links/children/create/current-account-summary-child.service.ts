import { Injectable } from '@angular/core';
import { CurrentAccountSummaryService } from '../../../services/current-account-summary.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentAccountSummaryChildService extends CurrentAccountSummaryService {
  protected getParamKey(): string {
    // We must come up with a fake param key, to avoid that the (parent) unit
    // code is loaded from the route parameter map.
    return 'childAccountSummaryCode';
  }
}
