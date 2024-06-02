import { promises as fs } from 'node:fs'

export async function listFiles(dir: string): Promise<string[]> {
  return await fs.readdir(dir, { recursive: true })
}
