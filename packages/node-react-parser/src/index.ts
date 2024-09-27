import { listTsxFiles, readTsConfigFile } from './adapters/file-system'
import { parseComponents } from './react-ast'
import { Component } from './entities/component'

export async function findComponents(
  projectDirectory: string,
  directoryPath: string,
): Promise<Component[]> {
  const filenames = await listTsxFiles(directoryPath)
  const compilerOptions = await readTsConfigFile(projectDirectory)

  return await parseComponents(directoryPath, filenames, compilerOptions)
}
