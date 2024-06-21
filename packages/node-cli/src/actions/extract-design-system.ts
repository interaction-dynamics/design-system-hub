import { relative } from 'node:path'
import { DesignSystem } from '../domain/entities/design-system'

import { findRemoteUrl, findRootPath } from '../adapters/git'
import { findPackageConfig } from '../adapters/package'
import { detectComponents } from '../adapters/react-ast'
import { findDesignSystem } from '../domain/use-cases/design-system'
import { findPages } from '../domain/use-cases/page'
import { isDirectory, listFiles, readFile } from '../adapters/file-system'

async function detectPages(projectPath: string) {
  return findPages({ projectPath }, { readFile, isDirectory, listFiles })
}

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
      detectPages,
    },
  })
}
