import {
  EVENT_SERVICE,
  PRODUCT_INTRO_COMPONENT,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PRODUCT_INTRO_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/product/product-intro/product-intro.component.ts
  class: PRODUCT_INTRO_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [],
  addParams: [{ className: EVENT_SERVICE, importPath: SPARTACUS_CORE }],
};
