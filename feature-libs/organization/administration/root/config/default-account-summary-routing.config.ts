import { ParamsMapping, RoutingConfig } from '@spartacus/core';
import { ROUTE_PARAMS } from '../route-params';

const listPath = `organization/account-summary/:${ROUTE_PARAMS.accountSummaryCode}`;
const paramsMapping: ParamsMapping = {
  accountSummaryCode: 'uid',
  addressId: 'id',
  userCode: 'customerId',
};

export const defaultAccountSummaryRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgAccountSummary: {
        paths: ['organization/account-summary'],
      },
      orgAccountSummaryCreate: {
        paths: ['organization/account-summary/create'],
      },
      orgAccountSummaryDetails: {
        paths: [listPath],
        paramsMapping,
      },
      orgAccountSummaryEdit: {
        paths: [`${listPath}/edit`],
        paramsMapping,
      },
      orgAccountSummaryChildren: {
        paths: [`${listPath}/children`],
        paramsMapping,
      },
      orgAccountSummaryCreateChild: {
        paths: [`${listPath}/children/create`],
        paramsMapping,
      },
      orAccountSummaryUserList: {
        paths: [`${listPath}/users`],
        paramsMapping,
      },
      orgAccountSummaryCreateUser: {
        paths: [`${listPath}/users/create`],
        paramsMapping,
      },
      orgAccountSummaryUserRoles: {
        paths: [`${listPath}/users/:userCode/roles`],
        paramsMapping,
      },
      orgAccountSummaryApprovers: {
        paths: [`${listPath}/approvers`],
        paramsMapping,
      },
      orgAccountSummaryAssignApprovers: {
        paths: [`${listPath}/approvers/assign`],
        paramsMapping,
      },
      orgAccountSummaryAddressList: {
        paths: [`${listPath}/addresses`],
        paramsMapping,
      },
      orgAccountSummaryAddressCreate: {
        paths: [`${listPath}/addresses/create`],
        paramsMapping,
      },
      orgAccountSummaryAddressDetails: {
        paths: [`${listPath}/addresses/:addressId`],
        paramsMapping,
      },
      orgAccountSummaryAddressEdit: {
        paths: [`${listPath}/addresses/:addressId/edit`],
        paramsMapping,
      },
      orgAccountSummaryCostCenters: {
        paths: [`${listPath}/cost-centers`],
        paramsMapping,
      },
      orgAccountSummaryCreateCostCenter: {
        paths: [`${listPath}/cost-centers/create`],
        paramsMapping,
      },
    },
  },
};
