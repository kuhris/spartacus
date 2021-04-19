import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserIdService } from '../auth';
import { ConsentEventModule } from './events';
import { StateWithUser } from './store';
import { LoadUserConsents } from './store/actions/user-consents.action';
import { UserStoreModule } from './store/user-store.module';

/**
 * @deprecated since 3.2, moved to the `@spartacus/user` package.
 */
@NgModule({
  imports: [UserStoreModule, ConsentEventModule],
  providers: [
    // TODO Cleanup and move to user root
    {
      provide: APP_INITIALIZER,
      useFactory: (
        store: Store<StateWithUser>,
        userIdService: UserIdService
      ) => {
        return () => {
          userIdService.invokeWithUserId((userId) =>
            store.dispatch(new LoadUserConsents(userId))
          );
        };
      },
      multi: true,
      deps: [Store, UserIdService],
    },
  ],
})
export class UserModule {
  static forRoot(): ModuleWithProviders<UserModule> {
    return {
      ngModule: UserModule,
    };
  }
}
