import { Injectable } from '@angular/core';
import {
  B2BUser,
  B2BUserRole,
  EntitiesModel,
  PaginationModel,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../../shared/index';
import { AccountSummaryApproverListService } from '../account-summary-approver-list.service';

@Injectable({
  providedIn: 'root',
})
export class AccountSummaryAssignedApproverListService extends AccountSummaryApproverListService {
  protected tableType = OrganizationTableType.UNIT_ASSIGNED_APPROVERS;

  protected load(
    pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    this.unitService.clearAssignedUsersList(
      code,
      B2BUserRole.APPROVER,
      pagination
    );
    return super
      .load(pagination, code)
      .pipe(map((users) => this.filterSelected(users)));
  }
}
