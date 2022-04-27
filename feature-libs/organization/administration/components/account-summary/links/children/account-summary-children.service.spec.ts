import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUnit, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { AccountSummaryChildrenService } from './account-summary-children.service';

const mockAccountSummaryEntities: EntitiesModel<B2BUnit> = {
  values: [
    {
      uid: 'first',
    },
    {
      uid: 'second',
    },
    {
      uid: 'third',
    },
  ],
};

class MockAccountSummaryChildrenService {
  getChildUnits(): Observable<EntitiesModel<B2BUnit>> {
    return of(mockAccountSummaryEntities);
  }
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('AccountSummaryCostCenterListService', () => {
  let service: AccountSummaryChildrenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AccountSummaryChildrenService,
        {
          provide: OrgUnitService,
          useClass: MockAccountSummaryChildrenService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(AccountSummaryChildrenService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should load children', () => {
    let result: EntitiesModel<B2BUnit>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
    expect(result.values[0].uid).toEqual('first');
    expect(result.values[1].uid).toEqual('second');
    expect(result.values[2].uid).toEqual('third');
  });
});
