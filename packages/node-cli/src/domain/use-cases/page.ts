import path from 'node:path'
import { Page } from '../entities/page'

const POSSIBLE_PATHS = ['docs/design-system/principles']

export async function findPages(
  { projectPath }: { projectPath: string },
  {
    listFiles,
    readFile,
    isDirectory,
  }: {
    listFiles: (s: string) => Promise<string[]>
    readFile: (f: string) => Promise<string>
    isDirectory: (f: string) => Promise<boolean>
  },
): Promise<Page[]> {
  const directoriesPromises = POSSIBLE_PATHS.map(
    p => `${projectPath}/${p}`,
  ).map(async p => ({
    filename: p,
    exists: await isDirectory(p),
  }))

  const documentationPaths = (await Promise.all(directoriesPromises))
    .filter(p => p.exists)
    .map(p => p.filename)

  const filesPromises = documentationPaths.map(async p => ({
    path: p,
    files: await listFiles(p),
  }))

  const pageFilenames = (await Promise.all(filesPromises)).flatMap(
    ({ path, files }) => files.map(f => `${path}/${f}`),
  )

  const contentPromises = pageFilenames.map(async f => ({
    path: path.basename(f),
    content: await readFile(f),
  }))

  const pages = await Promise.all(contentPromises)

  return pages
}
