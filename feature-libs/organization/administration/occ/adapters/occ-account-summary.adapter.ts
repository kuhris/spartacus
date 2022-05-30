import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AccountSummaryDocument,
  ConverterService,
  EntitiesModel,
  Occ,
  OccEndpointsService,
  SearchConfig
} from '@spartacus/core';
import {
  ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER,
  ACCOUNT_SUMMARY_DOCUMENTS_NORMALIZER,
  AccountSummaryAdapter
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';

@Injectable()
export class OccAccountSummaryAdapter implements AccountSummaryAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}



  load(userId: string, documentNumber: string): Observable<AccountSummaryDocument> {
    return this.http
      .get<Occ.AccountSummaryDocument>(this.getAccountSummaryDocumentEndpoint(userId, documentNumber))
      .pipe(this.converter.pipeable(ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER));
  }

  loadList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<AccountSummaryDocument>> {
    return this.http
      .get<Occ.AccountSummaryList>(this.getAccountSummaryDocumentsEndpoint(userId, params))
      .pipe(this.converter.pipeable(ACCOUNT_SUMMARY_DOCUMENTS_NORMALIZER));
  }

  protected getAccountSummaryDocumentEndpoint(
    userId: string,
    documentNumber: string
  ): string {
    return this.occEndpoints.buildUrl('accountSummaryDocument', {
      urlParams: { userId, documentNumber },
    });
  }

  protected getAccountSummaryDocumentsEndpoint(
    userId: string,
    params?: SearchConfig
  ): string {
    return this.occEndpoints.buildUrl('accountSummaryDocuments', {
      urlParams: { userId },
      queryParams: params,
    });
  }
}
