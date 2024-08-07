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
