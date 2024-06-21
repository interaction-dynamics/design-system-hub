import { Page } from '../entities/page'

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
  const possibleDocumentationPaths = ['docs/design-system/guidelines'].map(
    p => `${projectPath}/${p}`,
  )

  const documentationPaths = (
    await Promise.all(
      possibleDocumentationPaths.map(async p => ({
        filename: p,
        exists: await isDirectory(p),
      })),
    )
  )
    .filter(p => p.exists)
    .map(p => p.filename)

  const pageFilenames = (
    await Promise.all(
      documentationPaths.map(async p => ({
        path: p,
        files: await listFiles(p),
      })),
    )
  ).flatMap(({ path, files }) => files.map(f => `${path}/${f}`))

  const pages = await Promise.all(
    pageFilenames.map(async f => ({
      path: f,
      content: await readFile(f),
    })),
  )

  return pages
}
