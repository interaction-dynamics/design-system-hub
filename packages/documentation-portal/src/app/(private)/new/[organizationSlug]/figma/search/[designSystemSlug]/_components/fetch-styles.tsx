import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findFigmaDesignSystemCredentials } from '@/adapters/data-access/figma-design-system-credentials'
import { findFigmaFilesByDesignSystemId } from '@/adapters/data-access/figma-file'
import { fetchStyles } from '@/adapters/providers/figma/actions/styles'
import { deleteStyles, insertStyles } from '@/adapters/data-access/styles'
import { syncStyles } from '@/domain/use-cases/sync-styles'
import { FetchIndicator } from '@/components/organisms/fetch-indicator'

interface Props {
  designSystemSlug: string
}

export async function FetchStyles({ designSystemSlug }: Props) {
  const designSystem = await findDesignSystemBySlug(designSystemSlug)

  if (!designSystem) throw new Error('Design system not found')

  const { accessToken } = await findFigmaDesignSystemCredentials(
    designSystem.id
  )

  const files = await findFigmaFilesByDesignSystemId(designSystem.id)

  const fileKeys = files.map((file) => file.fileKey)

  const styles = await fetchStyles(fileKeys, accessToken)

  await syncStyles(
    { designSystemId: designSystem.id, styles },
    { deleteStyles, insertStyles }
  )

  return (
    <FetchIndicator
      title={`${styles.length} styles found`}
      details={styles.map((c) => c.name)}
    />
  )
}
