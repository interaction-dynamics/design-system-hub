import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { FormInput } from './form-input'

export async function FormInputServer({
  designSystemSlug,
}: {
  designSystemSlug: string
}) {
  const designSystem = await findDesignSystemBySlug(designSystemSlug)

  if (!designSystem) {
    return null
  }

  return <FormInput designSystem={designSystem} />
}
