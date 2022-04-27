import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Address, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { AccountSummaryAddressListService } from './account-summary-address-list.service';

const mockAccountSummaryAddressEntities: EntitiesModel<Address> = {
  values: [
    {
      id: 'first',
    },
    {
      id: 'second',
    },
    {
      id: 'third',
    },
  ],
};

class MockAccountSummaryAddressListService {
  getAddresses(): Observable<EntitiesModel<Address>> {
    return of(mockAccountSummaryAddressEntities);
  }
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('AccountSummaryAddressListService', () => {
  let service: AccountSummaryAddressListService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AccountSummaryAddressListService,
        {
          provide: OrgUnitService,
          useClass: MockAccountSummaryAddressListService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(AccountSummaryAddressListService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should load addresses', () => {
    let result: EntitiesModel<Address>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
    expect(result.values[0].id).toEqual('first');
    expect(result.values[1].id).toEqual('second');
    expect(result.values[2].id).toEqual('third');
  });
});
