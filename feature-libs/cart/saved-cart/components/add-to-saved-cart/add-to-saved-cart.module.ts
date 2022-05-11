import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { AddToSavedCartComponent } from './add-to-saved-cart.component';

@NgModule({
  imports: [CommonModule, RouterModule, I18nModule, UrlModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AddToSavedCartsComponent: {
          component: AddToSavedCartComponent,
        },
      },
    }),
  ],
  exports: [AddToSavedCartComponent],
  declarations: [AddToSavedCartComponent],
})
export class AddToSavedCartModule {}
