import { FigmaDesignSystemCredentials, FigmaFile } from '@prisma/client'
import { DesignSystem } from '../entities/design-system'

export async function findDefaultDesignSystemName(
  {
    designSystem,
  }: {
    designSystem: DesignSystem
  },
  {
    findFigmaFilesByDesignSystemId,
    findFigmaDesignSystemCredentials,
    fetchFigmaFile,
  }: {
    findFigmaFilesByDesignSystemId: (
      designSystemId: string
    ) => Promise<FigmaFile[]>
    findFigmaDesignSystemCredentials: (
      designSystemId: string
    ) => Promise<FigmaDesignSystemCredentials>
    fetchFigmaFile: (
      fileKey: string,
      oAuthToken: string
    ) => Promise<{ name: string }>
  }
): Promise<string> {
  const files = await findFigmaFilesByDesignSystemId(designSystem.id)

  if (files.length !== 1) return ''

  const credentials = await findFigmaDesignSystemCredentials(designSystem.id)

  const { name } = await fetchFigmaFile(
    files[0].fileKey,
    credentials.accessToken
  )

  return name
}
