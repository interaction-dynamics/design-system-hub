import { join } from 'node:path'

export async function saveConfig<T>(
  { config, projectPath }: { config: T; projectPath: string },
  {
    saveMetadataFile,
  }: {
    saveMetadataFile: (obj: { filePath: string; content: T }) => Promise<void>
  },
): Promise<void> {
  const filePath = getConfigFilePath(projectPath)

  await saveMetadataFile({
    filePath,
    content: config,
  })
}

export async function readConfig<T>(
  { projectPath }: { projectPath: string },
  {
    readMetadataFile,
  }: {
    readMetadataFile: (filePath: string) => Promise<T>
  },
): Promise<T> {
  const filePath = getConfigFilePath(projectPath)

  try {
    return await readMetadataFile(filePath)
  } catch {
    return {} as T
  }
}

function getConfigFilePath(projectPath: string): string {
  return join(projectPath, '.design-system', 'config.json')
}
