import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join as joinPath, relative } from 'node:path'
import Enquirer from 'enquirer'
import { findPackageConfigPath } from '../adapters/package'
import { saveConfig } from '../domain/use-cases/config'

const { prompt } = Enquirer

export async function setup(targetPath: string) {
  const acceptTargetPath = await prompt({
    type: 'confirm',
    name: 'acceptTargetPath',
    initial: true,
    message: `Set up Design system path "${targetPath}"?`,
  })

  if (!acceptTargetPath) return 0

  const projectPath = dirname(await findPackageConfigPath(targetPath))

  const acceptProjectPath = await prompt({
    type: 'confirm',
    name: 'acceptProjectPath',
    initial: true,
    message: `Save config in directory "${projectPath}"?`,
  })

  if (!acceptProjectPath) return 0

  await saveConfig({
    options: { targetPath, projectPath },
    context: {
      writeFile,
      joinPath,
      getRelativePath: relative,
      getDirname: dirname,
      makeDirectory: (path: string) => mkdir(path, { recursive: true }),
    },
  })
}
