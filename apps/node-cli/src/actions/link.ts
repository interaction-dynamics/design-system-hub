import { readFile, writeFile } from 'node:fs/promises'
import { dirname, relative } from 'node:path'

import { makeDirectory } from '../adapters/file-system'
import { linkDesignSystem } from '../domain/use-cases/design-system'
import {
  confirm,
  printText,
  printWarning,
  select,
  text,
} from '../adapters/prompt'
import {
  requestOrganizations,
  requestDesignSystems,
} from '../adapters/rest-api'
import { readGlobalConfig } from '../adapters/global-store'
import { readConfig, saveConfig } from '../domain/use-cases/config'
import {
  readMetadataFile,
  saveMetadataFile,
} from '../domain/use-cases/metadata'
import { Config } from '../domain/entities/config'

export async function link(
  projectPath: string,
  targetPath: string | undefined,
) {
  const { token } = await readGlobalConfig()

  if (!token) {
    printWarning('You are not logged in. Run `ds login` command to login.')
    return
  }

  const config = await readConfig<Config>(
    { projectPath },
    {
      readMetadataFile: (filePath: string) =>
        readMetadataFile(
          { filePath },
          { readFile: (filePath: string) => readFile(filePath, 'utf-8') },
        ),
    },
  )
  try {
    await linkDesignSystem(
      { projectPath, targetPath, token, config },
      {
        readGlobalConfig,
        promptConfirm: confirm,
        promptInput: text,
        promptSelect: select,
        requestOrganizations,
        requestDesignSystems,
        getRelativePath: relative,
        saveConfig: ({ projectPath, config }) =>
          saveConfig(
            { projectPath, config },
            {
              saveMetadataFile: ({ filePath, content }) =>
                saveMetadataFile(
                  {
                    filePath,
                    content,
                  },
                  {
                    writeFile,
                    getDirname: dirname,
                    makeDirectory,
                  },
                ),
            },
          ),
      },
    )

    printText('Linking successful')
  } catch (error) {
    if (error.message === 'Unauthorized') {
      printWarning('Invalid token. Run `ds login` command to login.')
      return
    }
  }
}
