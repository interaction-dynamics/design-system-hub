import path from 'node:path'
import { promises as fs } from 'node:fs'
import ts from 'typescript'

export async function listTsxFiles(dir: string): Promise<string[]> {
  return (await fs.readdir(dir, { recursive: true }))
    .filter(file => file.endsWith('.tsx'))
    .map(file => path.join(dir, file))
}

export async function readTsConfigFile(
  projectDirectory: string,
): Promise<ts.CompilerOptions> {
  const tsConfigFilename = path.join(projectDirectory, './tsconfig.json')

  return JSON.parse(await fs.readFile(tsConfigFilename, 'utf8'))
}
