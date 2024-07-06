import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { FormInput } from './form-input'
import { findFigmaFilesByDesignSystemId } from '@/adapters/data-access/figma-file'
import { findFigmaDesignSystemCredentials } from '@/adapters/data-access/figma-design-system-credentials'
import { findDefaultDesignSystemName } from '@/domain/use-cases/find-default-design-system-name'
import { fetchFile } from '@/adapters/providers/figma/actions/files'
import { findDefaultDesignSystemSlug } from '@/domain/use-cases/find-default-design-system-slug'

export async function FormInputServer({
  designSystemSlug,
}: {
  designSystemSlug: string
}) {
  const designSystem = await findDesignSystemBySlug(designSystemSlug)

  if (!designSystem) {
    return null
  }

  const defaultName = await findDefaultDesignSystemName(
    { designSystem },
    {
      findFigmaDesignSystemCredentials,
      findFigmaFilesByDesignSystemId,
      fetchFigmaFile: fetchFile,
    }
  )

  const defaultSlug = await findDefaultDesignSystemSlug(
    { name: defaultName },
    { findDesignSystemBySlug }
  )

  return (
    <FormInput
      designSystem={designSystem}
      defaultName={defaultName}
      defaultSlug={defaultSlug}
      defaultVisibility={designSystem.isPublic ? 'public' : 'private'}
    />
  )
}
