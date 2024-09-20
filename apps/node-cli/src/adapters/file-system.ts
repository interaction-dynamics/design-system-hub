import { promises as fs } from 'node:fs'

export async function listFiles(dir: string): Promise<string[]> {
  return await fs.readdir(dir, { recursive: true })
}

export async function makeDirectory(path: string) {
  return await fs.mkdir(path, { recursive: true })
}

export async function isDirectory(path: string) {
  return fs
    .access(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}

export async function readFile(path: string) {
  return fs.readFile(path, { encoding: 'utf-8' })
}
