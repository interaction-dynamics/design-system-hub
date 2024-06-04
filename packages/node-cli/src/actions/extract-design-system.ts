import { relative } from 'node:path'
import { DesignSystem } from '../entities/DesignSystem'

import { findRemoteUrl, findRootPath } from '../adapters/git'
import { findPackageConfig } from '../adapters/package'
import { detectComponents } from '../adapters/react-ast'
import { findDesignSystem } from '../use-cases/design-system'

export async function extractDesignSystem(
  targetPath: string,
): Promise<DesignSystem> {
  return findDesignSystem({
    options: { targetPath },
    context: {
      findRepositoryUrl: findRemoteUrl,
      findProject: findPackageConfig,
      findRootPath,
      getRelativePath: relative,
      detectComponents,
    },
  })
}
