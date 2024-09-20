import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { FileList } from './file-list'

export async function FileListServer({
  designSystemSlug,
  organizationSlug,
}: {
  designSystemSlug: string
  organizationSlug: string
}) {
  const designSystem = await findDesignSystemBySlug(designSystemSlug)

  if (!designSystem) throw new Error('Design system not found')

  return (
    <FileList
      designSystemId={designSystem.id}
      designSystemSlug={designSystemSlug}
      organizationSlug={organizationSlug}
    />
  )
}
