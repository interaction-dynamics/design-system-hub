import { promises as fs } from 'node:fs'
import * as ts from 'typescript'

export async function readTsConfigFile(
  tsConfigPath: string,
): Promise<ts.CompilerOptions> {
  return JSON.parse(await fs.readFile(tsConfigPath, 'utf8'))
}
