import { notFound } from 'next/navigation'
import {
  findPartialComponents,
  findComponent,
} from '@/adapters/data-access/components'
import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { FetchIndicator } from '@/components/organisms/fetch-indicator'

export async function ComponentList({
  designSystemSlug,
}: {
  designSystemSlug: string
}) {
  const designSystem = await findDesignSystemBySlug(designSystemSlug)

  if (!designSystem) notFound()

  const partialComponents = await findPartialComponents(designSystem)

  const components = await Promise.all(
    partialComponents.map((c) => findComponent(designSystem, c.slug))
  )

  const repositoryComponents = components.filter((c) => c.providers.code)

  return (
    <FetchIndicator
      title={`${repositoryComponents.length} components found`}
      details={repositoryComponents.map((c) => c.name)}
    />
  )
}
