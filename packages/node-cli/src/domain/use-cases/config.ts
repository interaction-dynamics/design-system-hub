interface SaveConfigArguments {
  options: {
    targetPath: string
    projectPath: string
  }
  context: {
    writeFile: (path: string, content: string) => Promise<void>
    joinPath: (...paths: string[]) => string
    getRelativePath: (rootPath: string, targetPath: string) => string
    makeDirectory: (path: string) => Promise<string>
    getDirname: (path: string) => string
  }
}

export async function saveConfig({
  options: { targetPath, projectPath },
  context: { writeFile, joinPath, getRelativePath, getDirname, makeDirectory },
}: SaveConfigArguments): Promise<void> {
  const configFilename = joinPath(...getConfigPath(projectPath))

  const configDirname = getDirname(configFilename)

  await makeDirectory(configDirname)

  const designSystemPath = getRelativePath(projectPath, targetPath)

  const config = {
    designSystemPath,
  }

  await writeFile(configFilename, JSON.stringify(config, null, 2))
}

interface ReadConfigArguments {
  options: {
    targetPath: string
    projectPath: string
  }
  context: {
    readFile: (path: string) => Promise<string>
    joinPath: (...paths: string[]) => string
  }
}

export async function readConfig({
  options: { projectPath },
  context: { joinPath, readFile },
}: ReadConfigArguments): Promise<void> {
  const configFilename = joinPath(...getConfigPath(projectPath))

  const content = await readFile(configFilename)

  return JSON.parse(content)
}

function getConfigPath(projectPath: string): string[] {
  return [projectPath, '.design-system', 'config.json']
}
