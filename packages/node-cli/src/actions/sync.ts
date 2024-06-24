import { relative } from 'node:path'
import {
  pushDesignSystem,
  findDesignSystem,
} from '../domain/use-cases/design-system'
import { readConfig } from '../domain/use-cases/config'
import { readMetadataFile } from '../domain/use-cases/metadata'
import { Config } from '../domain/entities/config'
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

export async function sync(projectPath: string) {
  const config = await readConfig<Config>(
    { projectPath },
    {
      readMetadataFile: (filePath: string) =>
        readMetadataFile({ filePath }, { readFile }),
    },
  )

  const { token } = await readGlobalConfig()

  if (!token) {
    printWarning('You are not logged in. Run `ds login` command to login.')
    return
  }

  try {
    await pushDesignSystem(
      { projectPath, config, token },
      {
        findDesignSystem: async (targetPath: string) =>
          findDesignSystem({
            options: { targetPath },
            context: {
              findRepositoryUrl: findRemoteUrl,
              findProject: findPackageConfig,
              findRootPath,
              getRelativePath: relative,
              detectComponents,
              detectPages,
            },
          }),
        postDesignSystem,
      },
    )

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
