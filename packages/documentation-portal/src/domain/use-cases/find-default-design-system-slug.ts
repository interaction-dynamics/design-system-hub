import generateSlug from '@/lib/generate-slug'
import { DesignSystem } from '../entities/design-system'

export async function findDefaultDesignSystemSlug(
  { name }: { name: string },
  {
    findDesignSystemBySlug,
  }: { findDesignSystemBySlug: (slug: string) => Promise<DesignSystem | null> }
): Promise<string> {
  if (name === '') return ''

  const possibleSlug = generateSlug(name)

  try {
    const designSystem = await findDesignSystemBySlug(possibleSlug)

    if (!designSystem) return possibleSlug
  } catch {
  } finally {
    const randomSuffix = (Math.random() + 1)
      .toString()
      .replace('.', '')
      .substring(0, 5)

    return `${possibleSlug}-${randomSuffix}`
  }
}
