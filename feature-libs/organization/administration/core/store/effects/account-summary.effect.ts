import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AccountSummaryDocument,
  EntitiesModel,
  normalizeHttpError,
  StateUtils,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AccountSummaryConnector } from '../../connectors/account-summary/account-summary.connector';
import { AccountSummaryActions } from '../actions/index';

@Injectable()
export class AccountSummaryEffects {
  constructor(
    private actions$: Actions,
    private accountSummaryConnector: AccountSummaryConnector
  ) { }

  loadAccountSummaryDocument$: Observable<
    | AccountSummaryActions.LoadAccountSummaryDocumentSuccess
    | AccountSummaryActions.LoadAccountSummaryDocumentFail
    > = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountSummaryActions.LOAD_ACCOUNT_SUMMARY_DOCUMENT),
      map((action: AccountSummaryActions.LoadAccountSummaryDocument) => action.payload),
      switchMap(({ userId, documentNumber }) => {
        return this.accountSummaryConnector.get(userId, documentNumber).pipe(
          map((document: AccountSummaryDocument) => {
            return new AccountSummaryActions.LoadAccountSummaryDocumentSuccess([document]);
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              new AccountSummaryActions.LoadAccountSummaryDocumentFail({
                documentNumber,
                error: normalizeHttpError(error),
              })
            )
          )
        );
      })
    )
  );

  loadAccountSummaryDocuments$: Observable<
    | AccountSummaryActions.LoadAccountSummaryDocumentsSuccess
    | AccountSummaryActions.LoadAccountSummaryDocumentSuccess
    | AccountSummaryActions.LoadAccountSummaryDocumentsFail
    > = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountSummaryActions.LOAD_ACCOUNT_SUMMARY_DOCUMENTS),
      map((action: AccountSummaryActions.LoadAccountSummaryDocuments) => action.payload),
      switchMap((payload) =>
        this.accountSummaryConnector.getList(payload.userId, payload.params).pipe(
          switchMap((documents: EntitiesModel<AccountSummaryDocument>) => {
            const { values, page } = StateUtils.normalizeListPage(
              documents,
              'documentNumber'
            );
            return [
              new AccountSummaryActions.LoadAccountSummaryDocumentSuccess(values),
              new AccountSummaryActions.LoadAccountSummaryDocumentsSuccess({
                page,
                params: payload.params,
              }),
            ];
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              new AccountSummaryActions.LoadAccountSummaryDocumentsFail({
                params: payload.params,
                error: normalizeHttpError(error),
              })
            )
          )
        )
      )
    )
  );
}
