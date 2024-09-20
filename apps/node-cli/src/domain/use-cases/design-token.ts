import { StyleLibrary } from '../entities/style-library'

const folderName = '.tokens'

export async function pullDesignToken(
  { token, targetPath }: { token: string; targetPath: string },
  {
    fetchDesignTokens,
    writeFile,
    findProjectPath,
    makeDirectory,
  }: {
    fetchDesignTokens: ({
      token,
    }: {
      token: string
    }) => Promise<Record<string, unknown>>
    writeFile: (filename: string, data: string) => Promise<void>
    findProjectPath: (targetPath: string) => Promise<string>
    makeDirectory: (targetPath: string) => Promise<string>
  },
) {
  const designTokens = await fetchDesignTokens({ token })

  const projectPath = await findProjectPath(targetPath)

  const directoryName = `${projectPath}/${folderName}`

  await makeDirectory(directoryName)

  const tokenFiles = Object.entries(designTokens).map(([tokenName, value]) => ({
    filename: `${directoryName}/${tokenName}.json`,
    content: JSON.stringify(value, null, 2),
  }))

  await Promise.all(
    tokenFiles.map(({ filename, content }) => writeFile(filename, content)),
  )

  return tokenFiles
}

export async function installStyles(
  {
    targetPath,
    styleLibraries,
  }: { targetPath: string; styleLibraries: StyleLibrary[] },
  {
    findProjectPath,
  }: { findProjectPath: (targetPath: string) => Promise<string> },
) {
  const projectPath = await findProjectPath(targetPath)

  const tokenPath = `${projectPath}/${folderName}`

  const libraries = await Promise.all(
    styleLibraries.map(async styleLibrary =>
      (await styleLibrary.detect(projectPath)) ? styleLibrary : null,
    ),
  )

  const library = libraries.filter(Boolean)[0]

  if (!library) {
    throw new Error('No supported styles found')
  }

  await library.install(projectPath, tokenPath)

  return library
}
