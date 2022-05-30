import { InjectionToken } from '@angular/core';
import { AccountSummaryDocument, Converter, EntitiesModel } from '@spartacus/core';

export const ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER = new InjectionToken<Converter<any, AccountSummaryDocument>>(
  'AccountSummaryDocumentNormalizer'
);
export const ACCOUNT_SUMMARY_DOCUMENTS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<AccountSummaryDocument>>
  >('AccountSummaryDocumentListNormalizer');
