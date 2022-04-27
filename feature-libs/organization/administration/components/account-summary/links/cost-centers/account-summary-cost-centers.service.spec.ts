import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CostCenter, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { AccountSummaryCostCenterListService } from '.';

const mockAccountSummaryCostCentersEntities: EntitiesModel<CostCenter> = {
  values: [
    {
      code: 'first',
    },
    {
      code: 'second',
    },
    {
      code: 'third',
    },
  ],
};

class MockAccountSummaryCostCentersService {
  getCostCenters(): Observable<EntitiesModel<CostCenter>> {
    return of(mockAccountSummaryCostCentersEntities);
  }
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UnitCostCenterListService', () => {
  let service: AccountSummaryCostCenterListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AccountSummaryCostCenterListService,
        {
          provide: OrgUnitService,
          useClass: MockAccountSummaryCostCentersService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(AccountSummaryCostCenterListService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should load cost centers', () => {
    let result: EntitiesModel<CostCenter>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
    expect(result.values[0].code).toEqual('first');
    expect(result.values[1].code).toEqual('second');
    expect(result.values[2].code).toEqual('third');
  });
});
