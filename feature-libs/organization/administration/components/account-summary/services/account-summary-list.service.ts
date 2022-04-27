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
import { AccountSummaryItemService } from './account-summary-item.service';
import { AccountSummaryTreeService } from './account-summary-tree.service';

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
    protected accountSummaryItemService: AccountSummaryItemService,
    protected accountSummaryTreeService: AccountSummaryTreeService
  ) {
    super(tableService);
  }

  protected load(): Observable<EntitiesModel<B2BUnitTreeNode>> {
    return this.unitService.getTree().pipe(
      switchMap((node) =>
        this.accountSummaryItemService.key$.pipe(
          map((key) => {
            this.accountSummaryTreeService.initialize(node, key);
            return node;
          })
        )
      ),
      switchMap((tree) =>
        this.accountSummaryTreeService.treeToggle$.pipe(map(() => tree))
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
      expanded: this.accountSummaryTreeService.isExpanded(unit.id, depthLevel),
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
    return 'uid';
  }
}
