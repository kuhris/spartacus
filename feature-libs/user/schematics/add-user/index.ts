import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addFeatures,
  addPackageJsonDependenciesForLibrary,
  analyzeApplication,
  analyzeCrossFeatureDependencies,
  finalizeInstallation,
  LibraryOptions as SpartacusUserOptions,
  readPackageJson,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addUserFeatures(options: SpartacusUserOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const features = analyzeCrossFeatureDependencies(
      options.features as string[]
    );

    return chain([
      analyzeApplication(options, features),

      addFeatures(options, features),
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      finalizeInstallation(options, features),
    ]);
  };
}
