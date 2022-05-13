import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Country, Region } from '@spartacus/core';
import { Title } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserRegistrationFormService } from './user-registration-form.service';

@Component({
  selector: 'cx-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRegistrationFormComponent implements OnInit {
  titles$: Observable<Title[]>;

  countries$: Observable<Country[]>;

  regions$: Observable<Region[]>;

  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  isLoading$ = new BehaviorSubject(false);

  registerForm: FormGroup;

  messageContent: string;

  constructor(
    protected userRegistrationFormService: UserRegistrationFormService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.userRegistrationFormService.initializeForm();

    this.titles$ = this.userRegistrationFormService.getTitles();

    this.countries$ = this.userRegistrationFormService.getCountries();

    this.regions$ = this.selectedCountry$.pipe(
      switchMap((country) =>
        this.userRegistrationFormService.getRegions(country)
      )
    );
  }

  countrySelected(country: Country): void {
    this.selectedCountry$.next(country?.isocode);
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.register();
      // TODO: Redirect customer to login page after successful registration.
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  register(): void {
    this.isLoading$.next(true);
    this.userRegistrationFormService.submit(this.registerForm).subscribe({
      complete: () => {
        this.registerForm.reset();
        this.isLoading$.next(false);
      },
      error: () => this.isLoading$.next(false),
    });
  }
}
