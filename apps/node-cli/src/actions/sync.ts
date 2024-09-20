import { relative } from 'node:path'
import { detectDesignSystem } from '../domain/use-cases/design-system'
import { findRemoteUrl, findRootPath } from '../adapters/git'
import { findPackageConfig } from '../adapters/package'
import { detectComponents } from '../adapters/react-ast'
import { readGlobalConfig } from '../adapters/global-store'
import { postDesignSystem } from '../adapters/rest-api'
import { printText, printWarning } from '../adapters/prompt'
import { findPages } from '../domain/use-cases/page'
import { isDirectory, listFiles, readFile } from '../adapters/file-system'

async function detectPages(projectPath: string) {
  return findPages({ projectPath }, { readFile, isDirectory, listFiles })
}

export async function sync(targetPath: string, designSystemToken?: string) {
  const token = designSystemToken ?? (await readGlobalConfig()).token

  if (!token) {
    printWarning('You are not logged in. Run `ds login` command to login.')
    return
  }

  try {
    const designSystem = await detectDesignSystem({
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

    const answer = await postDesignSystem(token, designSystem)

    if (!answer) {
      throw new Error('Failed to push design system')
    }

    printText('Sync successful')
  } catch (error) {
    if (error.message === 'Unauthorized') {
      printWarning('Invalid token. Run `ds login` command to login.')
      return
    } else {
      console.error(error.message)
    }
  }
}
