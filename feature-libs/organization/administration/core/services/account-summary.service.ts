import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AccountSummaryDocument,
  EntitiesModel,
  SearchConfig,
  StateUtils,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { Observable, queueScheduler, using } from 'rxjs';
import { StateWithOrganization, AccountSummaryActions } from '../store/index';

import {
  getAccountSummaryDocument,
  getAccountSummaryDocumentList,
  getAccountSummaryValue,
} from '../store/selectors/account-summary.selector';

import { auditTime, filter, map, observeOn, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountSummaryService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  LoadAccountSummaryDocument(documentNumber: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new AccountSummaryActions.LoadAccountSummaryDocument({ userId, documentNumber })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  loadAccountSummaryDocuments(params?: SearchConfig): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(new AccountSummaryActions.LoadAccountSummaryDocuments({ userId, params })),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  private getAccountSummaryState(
    documentNumber: string
  ): Observable<StateUtils.LoaderState<AccountSummaryDocument>> {
    return this.store.select(getAccountSummaryDocument(documentNumber));
  }

  private getAccountSummaryValue(documentNumber: string): Observable<AccountSummaryDocument> {
    return this.store.select(getAccountSummaryValue(documentNumber)).pipe(filter(Boolean));
  }

  private getAccountSummaryList(
    params
  ): Observable<StateUtils.LoaderState<EntitiesModel<AccountSummaryDocument>>> {
    return this.store.select(getAccountSummaryDocumentList(params));
  }

  get(documentNumber: string): Observable<AccountSummaryDocument> {
    const loading$ = this.getAccountSummaryState(documentNumber).pipe(
      auditTime(0),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.LoadAccountSummaryDocument(documentNumber);
        }
      })
    );

    return using(
      () => loading$.subscribe(),
      () => this.getAccountSummaryValue(documentNumber)
    );
  }

  getList(params: SearchConfig): Observable<EntitiesModel<AccountSummaryDocument>> {
    return this.getAccountSummaryList(params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<AccountSummaryDocument>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadAccountSummaryDocuments(params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<AccountSummaryDocument>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

}
