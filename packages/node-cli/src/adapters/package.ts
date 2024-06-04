import path from 'node:path'
import fs, { readFile, access } from 'node:fs/promises'

export async function findPackageConfig(
  targetPath: string,
): Promise<{ name: string; path: string }> {
  const packageConfigPath = await findPackageConfigPath(targetPath)

  const content = await readFile(packageConfigPath, 'utf8')

  return {
    ...JSON.parse(content),
    path: path.dirname(packageConfigPath),
  }
}

export async function findPackageConfigPath(
  targetPath: string,
): Promise<string> {
  let currentTargetPath = targetPath

  while (currentTargetPath !== '/') {
    const packageJsonPath = path.join(currentTargetPath, 'package.json')
    try {
      await access(packageJsonPath, fs.constants.F_OK)

      return packageJsonPath
    } catch (error) {
      currentTargetPath = path.dirname(currentTargetPath)
    }
  }

  throw new Error('Impossible to find package.json')
}
