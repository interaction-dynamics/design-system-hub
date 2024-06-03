import { promises as fs } from 'node:fs'

export async function readTsConfigFile(tsConfigPath: string): Promise<any> {
  return JSON.parse(await fs.readFile(tsConfigPath, 'utf8'))
}
