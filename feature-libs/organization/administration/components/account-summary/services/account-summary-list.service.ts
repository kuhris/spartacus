/*
import { Injectable } from '@angular/core';
import { EntitiesModel, AccountSummaryDocument } from '@spartacus/core';
import {
  B2BUnitNode,
  B2BUnitTreeNode,
  AccountSummaryService,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
// import { map, switchMap } from 'rxjs/operators';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';
// import { AccountSummaryItemService } from './account-summary-item.service';
// import { AccountSummaryTreeService } from './account-summary-tree.service';
// import {AccountSummaryService} from "../../../core/services/account-summary.service";
 */

/**
 * Service to populate Unit data to `Table` data. Unit
 * data is driven by the table configuration, using the `OrganizationTables.UNIT`.
 */

/*
@Injectable({
  providedIn: 'root',
})
export class AccountSummaryListService extends ListService<AccountSummaryDocument> {
  protected tableType = OrganizationTableType.ACCOUNT_SUMMARY;

  constructor(
    protected tableService: TableService,
    protected accountSummaryService: AccountSummaryService,
  ) {
    debugger;
    super(tableService);
  }

  protected load(): Observable<EntitiesModel<AccountSummaryDocument>> {

    return this.accountSummaryService.getList({});
    // return this.unitService.getTree().pipe(
    //   switchMap((node) =>
    //     this.accountSummaryItemService.key$.pipe(
    //       map((key) => {
    //         this.accountSummaryTreeService.initialize(node, key);
    //         return node;
    //       })
    //     )
    //   ),
    //   switchMap((tree) =>
    //     this.accountSummaryTreeService.treeToggle$.pipe(map(() => tree))
    //   ),
    //   map((tree: B2BUnitNode) => this.convertListItem(tree))
    // );
  }

  protected convertListItem(
    unit: B2BUnitNode,
    depthLevel = 0,
    pagination = { totalResults: 0 }
  ): EntitiesModel<B2BUnitTreeNode> {
    let values;
    if (unit || depthLevel || pagination) {
      values = [];
    }
    return { values, pagination };
    // let values = [];
    // if (!unit) {
    //   return;
    // }
    //
    // const node: B2BUnitTreeNode = {
    //   ...unit,
    //   count: unit.children?.length ?? 0,
    //   expanded: this.accountSummaryTreeService.isExpanded(unit.id, depthLevel),
    //   depthLevel,
    //   // tmp, should be normalized
    //   uid: unit.id,
    //   children: [...unit.children].sort((unitA, unitB) =>
    //     unitA.name.localeCompare(unitB.name)
    //   ),
    // };
    //
    // values.push(node);
    // pagination.totalResults++;
    //
    // node.children.forEach((childUnit) => {
    //   const childList = this.convertListItem(
    //     childUnit,
    //     depthLevel + 1,
    //     pagination
    //   )?.values;
    //   if (node.expanded && childList.length > 0) {
    //     values = values.concat(childList);
    //   }
    // });
    //
    // return { values, pagination };
  }

  key(): string {
    return 'uid';
  }
}

*/

import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import {
  B2BUnitNode,
  B2BUnitTreeNode,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import { UnitItemService } from '../../unit/services/unit-item.service';
import { UnitTreeService } from '../../unit/services/unit-tree.service';

/**
 * Service to populate Unit data to `Table` data. Unit
 * data is driven by the table configuration, using the `OrganizationTables.UNIT`.
 */
@Injectable({
  providedIn: 'root',
})
export class AccountSummaryListService extends ListService<B2BUnitTreeNode> {
  protected tableType = OrganizationTableType.UNIT;

  constructor(
    protected tableService: TableService,
    protected unitService: OrgUnitService,
    protected unitItemService: UnitItemService,
    protected unitTreeService: UnitTreeService
  ) {
    debugger;
    super(tableService);
  }

  protected load(): Observable<EntitiesModel<B2BUnitTreeNode>> {
    this.unitService.getTree().subscribe(aa => console.log('welcome to aa', aa));
    return this.unitService.getTree().pipe(
      switchMap((node) =>
        this.unitItemService.key$.pipe(
          map((key) => {
            this.unitTreeService.initialize(node, key);
            console.log('node is', node);
            return node;
          })
        )
      ),
      switchMap((tree) =>
        this.unitTreeService.treeToggle$.pipe(map(() => tree))
      ),
      map((tree: B2BUnitNode) => this.convertListItem(tree))
    );
  }

  protected convertListItem(
    unit: B2BUnitNode,
    depthLevel = 0,
    pagination = { totalResults: 0 }
  ): EntitiesModel<B2BUnitTreeNode> {
    let values = [];
    if (!unit) {
      return;
    }

    const node: B2BUnitTreeNode = {
      ...unit,
      count: unit.children?.length ?? 0,
      expanded: this.unitTreeService.isExpanded(unit.id, depthLevel),
      depthLevel,
      // tmp, should be normalized
      uid: unit.id,
      children: [...unit.children].sort((unitA, unitB) =>
        unitA.name.localeCompare(unitB.name)
      ),
    };

    values.push(node);
    pagination.totalResults++;

    node.children.forEach((childUnit) => {
      const childList = this.convertListItem(
        childUnit,
        depthLevel + 1,
        pagination
      )?.values;
      if (node.expanded && childList.length > 0) {
        values = values.concat(childList);
      }
    });

    return { values, pagination };
  }

  key(): string {
    console.log('getting key!');
    // return 'uid';
    return 'documentNumber';
  }
}

