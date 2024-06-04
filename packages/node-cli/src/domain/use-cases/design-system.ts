import { Component } from '../entities/Component'
import { DesignSystem } from '../entities/DesignSystem'

interface Arguments {
  options: { targetPath: string }
  context: {
    findRepositoryUrl: (targetPath: string) => Promise<string>
    findProject: (targetPath: string) => Promise<{ name: string; path: string }>
    findRootPath: (targetPath: string) => Promise<string>
    getRelativePath: (rootPath: string, targetPath: string) => string
    detectComponents: (
      targetPath: string,
      packagePath: string,
    ) => Promise<Component[]>
  }
}

export async function findDesignSystem({
  options: { targetPath },
  context: {
    findRepositoryUrl,
    findProject,
    findRootPath,
    getRelativePath,
    detectComponents,
  },
}: Arguments): Promise<DesignSystem> {
  const rootPath = await findRootPath(targetPath)
  const relativePath = getRelativePath(rootPath, targetPath)

  const url = await findRepositoryUrl(targetPath)
  const { name, path } = await findProject(targetPath)

  const components = await detectComponents(targetPath, path)

  return {
    relativePath,
    repository: {
      url,
    },
    project: {
      name,
    },
    components,
  }
}
