import fetchFigmaFiles from './fetchFigmaFiles'
import parseFigmaFiles from './parseFigmaFiles'

export default async function getDesignSystem(designSystemSlug: string) {
  const figmaFiles = await fetchFigmaFiles(
    process.env.FIGMA_TOKEN ?? '',
    process.env.FIGMA_FILE_IDS?.split(',') ?? []
  )

  const designSystem = parseFigmaFiles(figmaFiles)

  return designSystem
}
