import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Address, B2BUnit, Country, Region, Title } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../../../shared/item.service';
import { AccountSummaryAddressItemService } from '../services/account-summary-address-item.service';
import { AccountSummaryAddressFormService } from './account-summary-address-form.service';
import { CurrentAccountSummaryService } from '../../../services/current-account-summary.service';

@Component({
  selector: 'cx-org-account-summary-address-form',
  templateUrl: './account-summary-address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ItemService,
      useExisting: AccountSummaryAddressItemService,
    },
  ],
})
export class AccountSummaryAddressFormComponent implements OnInit {
  form: FormGroup = this.itemService.getForm();

  key$ = this.itemService.key$;
  countries$: Observable<Country[]> = this.formService.getCountries();
  titles$: Observable<Title[]> = this.formService.getTitles();
  regions$: Observable<Region[]> = this.formService.getRegions();

  unit$: Observable<B2BUnit> = this.currentAccountSummaryService.item$;

  constructor(
    protected itemService: ItemService<Address>,
    protected formService: AccountSummaryAddressFormService,
    protected currentAccountSummaryService: CurrentAccountSummaryService
  ) {}

  ngOnInit(): void {}
}
