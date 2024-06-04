import { promises as fs } from 'node:fs'
import { CompilerOptions } from 'typescript'

export async function readTsConfigFile(
  tsConfigPath: string,
): Promise<CompilerOptions> {
  return JSON.parse(await fs.readFile(tsConfigPath, 'utf8'))
}
