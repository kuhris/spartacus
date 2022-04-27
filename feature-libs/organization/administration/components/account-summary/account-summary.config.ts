import { AuthGuard, CmsConfig } from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { BREAKPOINT, TableConfig, TableLayout } from '@spartacus/storefront';
import { MAX_OCC_INTEGER_VALUE } from '../constants';
import { CostCenterDetailsCellComponent } from '../cost-center/details-cell/cost-center-details-cell.component';
import { ItemService } from '../shared/item.service';
import { ListService } from '../shared/list/list.service';
import { OrganizationTableType } from '../shared/organization.model';
import { AssignCellComponent } from '../shared/sub-list/assign-cell.component';
import { CellComponent } from '../shared/table/cell.component';
import { StatusCellComponent } from '../shared/table/status/status-cell.component';
import { UnitCellComponent } from '../shared/table/unit/unit-cell.component';
import { UserDetailsCellComponent } from '../user/details-cell/user-details-cell.component';
import { AccountSummaryDetailsCellComponent } from './details-cell/account-summary-details-cell.component';
import { AccountSummaryDetailsComponent } from './details/account-summary-details.component';
import { AccountSummaryFormComponent } from './form/account-summary-form.component';
import { AccountSummaryAddressDetailsComponent } from './links/addresses/details/account-summary-address-details.component';
import { AccountSummaryAddressFormComponent } from './links/addresses/form/account-summary-address-form.component';
import { LinkCellComponent } from './links/addresses/list/link-cell.component';
import { AccountSummaryAddressListComponent } from './links/addresses/list/account-summary-address-list.component';
import { AccountSummaryAssignedApproverListComponent } from './links/approvers/assigned/account-summary-assigned-approver-list.component';
import { AccountSummaryApproverListComponent } from './links/approvers/account-summary-approver-list.component';
import { AccountSummaryChildCreateComponent } from './links/children/create/account-summary-child-create.component';
import { UnitChildrenComponent } from './links/children/account-summary-children.component';
import { UnitCostCenterListComponent } from './links/cost-centers/account-summary-cost-centers.component';
import {
  UnitCostCenterCreateComponent,
  AccountSummaryUserCreateComponent,
} from './links/index';
import { UnitUserRolesCellComponent } from './links/users/list/account-summary-user-link-cell.component';
import { AccountSummaryUserListComponent } from './links/users/list/account-summary-user-list.component';
import { UnitUserRolesFormComponent } from './links/users/roles/account-summary-user-roles.component';
import { ToggleLinkCellComponent } from './list/toggle-link/toggle-link-cell.component';
import { AccountSummaryListComponent } from './list/account-summary-list.component';
import { AccountSummaryAddressRoutePageMetaResolver } from './services/account-summary-address-route-page-meta.resolver';
import { AccountSummaryItemService } from './services/account-summary-item.service';
import { AccountSummaryListService } from './services/account-summary-list.service';
import { AccountSummaryRoutePageMetaResolver } from './services/account-summary-route-page-meta.resolver';

export const unitsCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageUnitsListComponent: {
      component: AccountSummaryListComponent,
      providers: [
        {
          provide: ListService,
          useExisting: AccountSummaryListService,
        },
        {
          provide: ItemService,
          useExisting: AccountSummaryItemService,
        },
      ],
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'orgUnit.breadcrumbs.list',
              resolver: AccountSummaryRoutePageMetaResolver,
            },
          },
        },
        children: [
          {
            path: 'create',
            component: AccountSummaryFormComponent,
          },
          {
            path: `:${ROUTE_PARAMS.unitCode}`,
            component: AccountSummaryDetailsComponent,
            data: {
              cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.details' },
            },
            children: [
              {
                path: 'edit',
                component: AccountSummaryFormComponent,
              },
              {
                path: 'children',
                component: UnitChildrenComponent,
                data: {
                  cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.children' },
                },
                children: [
                  {
                    path: 'create',
                    component: AccountSummaryChildCreateComponent,
                  },
                ],
              },
              {
                path: 'approvers',
                data: {
                  cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.approvers' },
                },
                children: [
                  {
                    path: '',
                    component: AccountSummaryAssignedApproverListComponent,
                  },
                  {
                    path: 'assign',
                    component: AccountSummaryApproverListComponent,
                  },
                ],
              },
              {
                path: 'users',
                component: AccountSummaryUserListComponent,
                data: {
                  cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.users' },
                },
                children: [
                  {
                    path: 'create',
                    component: AccountSummaryUserCreateComponent,
                  },
                  {
                    path: `:${ROUTE_PARAMS.userCode}/roles`,
                    component: UnitUserRolesFormComponent,
                  },
                ],
              },
              {
                path: 'cost-centers',
                component: UnitCostCenterListComponent,
                data: {
                  cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.costCenters' },
                },
                children: [
                  {
                    path: 'create',
                    component: UnitCostCenterCreateComponent,
                  },
                ],
              },
              {
                path: 'addresses',
                component: AccountSummaryAddressListComponent,
                data: {
                  cxPageMeta: {
                    breadcrumb: 'orgUnit.breadcrumbs.addresses',
                    resolver: AccountSummaryAddressRoutePageMetaResolver,
                  },
                },
                children: [
                  {
                    path: 'create',
                    component: AccountSummaryAddressFormComponent,
                  },
                  {
                    path: `:${ROUTE_PARAMS.addressCode}`,
                    data: {
                      cxPageMeta: {
                        breadcrumb: 'orgUnit.breadcrumbs.addressDetails',
                      },
                    },
                    children: [
                      {
                        path: '',
                        component: AccountSummaryAddressDetailsComponent,
                      },
                      {
                        path: 'edit',
                        component: AccountSummaryAddressFormComponent,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      guards: [AuthGuard, AdminGuard],
    },
  },
};

export function unitsTableConfigFactory(): TableConfig {
  return unitsTableConfig;
}

export const unitsTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.UNIT]: {
      cells: ['name'],
      options: {
        layout: TableLayout.VERTICAL,
        cells: {
          name: {
            dataComponent: ToggleLinkCellComponent,
          },
          active: {
            dataComponent: StatusCellComponent,
          },
          uid: {
            dataComponent: CellComponent,
          },
        },
      },
      [BREAKPOINT.lg]: {
        cells: ['name', 'active', 'uid'],
      },
    },
    [OrganizationTableType.UNIT_USERS]: {
      cells: ['name', 'roles'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
        cells: {
          name: {
            dataComponent: UserDetailsCellComponent,
          },
          roles: {
            dataComponent: UnitUserRolesCellComponent,
          },
        },
      },
    },

    [OrganizationTableType.UNIT_CHILDREN]: {
      cells: ['name', 'active'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
        cells: {
          name: {
            dataComponent: AccountSummaryDetailsCellComponent,
          },
          active: {
            dataComponent: StatusCellComponent,
            linkable: false,
          },
        },
      },
    },

    [OrganizationTableType.UNIT_APPROVERS]: {
      cells: ['name', 'orgUnit', 'actions'],
      options: {
        cells: {
          name: {
            dataComponent: UserDetailsCellComponent,
          },
          actions: {
            dataComponent: AssignCellComponent,
          },
          orgUnit: {
            dataComponent: UnitCellComponent,
            linkable: false,
          },
        },
      },
    },

    [OrganizationTableType.UNIT_ASSIGNED_APPROVERS]: {
      cells: ['name', 'orgUnit', 'actions'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
        cells: {
          name: {
            dataComponent: UserDetailsCellComponent,
          },
          actions: {
            dataComponent: AssignCellComponent,
          },
          orgUnit: {
            dataComponent: UnitCellComponent,
            linkable: false,
          },
        },
      },
    },

    [OrganizationTableType.UNIT_COST_CENTERS]: {
      cells: ['name'],
      options: {
        cells: {
          name: {
            dataComponent: CostCenterDetailsCellComponent,
          },
        },
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },

    [OrganizationTableType.UNIT_ADDRESS]: {
      cells: ['formattedAddress'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
        cells: {
          formattedAddress: {
            dataComponent: LinkCellComponent,
          },
        },
      },
    },
  },
};
