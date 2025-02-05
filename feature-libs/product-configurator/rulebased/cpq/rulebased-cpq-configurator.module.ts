import { NgModule } from '@angular/core';
import { CpqConfiguratorOccModule } from './occ/cpq-configurator-occ.module';
import { CpqConfiguratorRestModule } from './rest/cpq-configurator-rest.module';

/**
 * Exposes the CPQ flavor of rulebase configurator, which connects to CPQ directly via
 * REST APIs and to commerce via OCC
 */
@NgModule({
  imports: [CpqConfiguratorOccModule, CpqConfiguratorRestModule],
})
export class RulebasedCpqConfiguratorModule {}
