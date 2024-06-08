// TODO merge with config

export async function saveMetadataFile<T extends object>(
  { filePath, content }: { filePath: string; content: T },
  { writeFile, getDirname, makeDirectory },
): Promise<void> {
  const configDirname = getDirname(filePath)
  await makeDirectory(configDirname)

  await writeFile(filePath, JSON.stringify(content, null, 2))
}

// function getFilePath(projectPath: string, basename: string): string[] {
//   return [projectPath, '.design-system', basename]
// }

export async function readMetadataFile<T extends object>(
  { filePath }: { filePath: string },
  {
    readFile,
  }: {
    readFile: (path: string) => Promise<string>
  },
): Promise<T> {
  const content = await readFile(filePath)

  const result: T = JSON.parse(content)

  return result
}
