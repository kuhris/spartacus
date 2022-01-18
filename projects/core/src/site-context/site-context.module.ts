import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  ConfigInitializer,
  CONFIG_INITIALIZER,
} from '../config/config-initializer/config-initializer';
import { provideDefaultConfigFactory } from '../config/config-providers';
import { provideConfigValidator } from '../config/config-validator/config-validator';
import { StateModule } from '../state/index';
import { baseSiteConfigValidator } from './config/base-site-config-validator';
import { SiteContextConfigInitializer } from './config/config-loader/site-context-config-initializer';
import { defaultSiteContextConfigFactory } from './config/default-site-context-config';
import { SiteContextEventModule } from './events/site-context-event.module';
import { contextInitializerProviders } from './providers/context-initializer-providers';
import { contextServiceMapProvider } from './providers/context-service-map';
import { contextServiceProviders } from './providers/context-service-providers';
import { siteContextParamsProviders } from './providers/site-context-params-providers';
import { SiteContextStoreModule } from './store/site-context-store.module';

/**
 * Initializes the site context config
 */
export function initSiteContextConfig(
  configInitializer: SiteContextConfigInitializer
): ConfigInitializer | null {
  return configInitializer;
}

@NgModule({
  imports: [StateModule, SiteContextStoreModule, SiteContextEventModule],
})
export class SiteContextModule {
  static forRoot(): ModuleWithProviders<SiteContextModule> {
    return {
      ngModule: SiteContextModule,
      providers: [
        provideDefaultConfigFactory(defaultSiteContextConfigFactory),
        contextServiceMapProvider,
        ...contextServiceProviders,
        ...siteContextParamsProviders,
        provideConfigValidator(baseSiteConfigValidator),
        {
          provide: CONFIG_INITIALIZER,
          useFactory: initSiteContextConfig,
          deps: [SiteContextConfigInitializer],
          multi: true,
        },
        ...contextInitializerProviders,
      ],
    };
  }
}
