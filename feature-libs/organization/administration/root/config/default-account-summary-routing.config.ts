import { ParamsMapping, RoutingConfig } from '@spartacus/core';
import { ROUTE_PARAMS } from '../route-params';
// const listPath = `organization/account-summary-details/:${ROUTE_PARAMS.unitCode}`;
// const listPath = `organization/account-summary-details/:${ROUTE_PARAMS.accountSummaryCode}`;
const listPath = `organization/account-summary/:${ROUTE_PARAMS.accountSummaryCode}`;
// const listPath = `organization/account-summary-details`;
const paramsMapping: ParamsMapping = {
  accountSummaryCode: 'uid',
  // unitCode: 'uid',
  // accountSummaryCode: 'documentNumber',
};

export const defaultAccountSummaryRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgAccountSummary: {
        paths: ['organization/account-summary'],
      },
      orgAccountSummaryDetails: {
        paths: [listPath],
        paramsMapping,
      },
    },
  },
};
