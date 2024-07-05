import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findFigmaDesignSystemCredentials } from '@/adapters/data-access/figma-design-system-credentials'
import { findFigmaFilesByDesignSystemId } from '@/adapters/data-access/figma-file'
import { findFigmaComponents } from '@/adapters/providers/figma/actions/design-system'
import { FetchIndicator } from './fetch-indicator'
import {
  createComponent,
  findComponentByName,
  updateComponent,
} from '@/adapters/data-access/components'
import {
  createComponentVariant,
  deleteComponentVariants,
} from '@/adapters/data-access/component-variants'
import { syncComponent } from '@/domain/use-cases/sync-component'
import { cache } from 'react'

interface Props {
  designSystemSlug: string
}

const cachedSync = cache(
  async (designSystemId: string, accessToken: string) => {
    console.log('cachedSync', designSystemId, accessToken)

    const files = await findFigmaFilesByDesignSystemId(designSystemId)

    const fileKeys = files.map((file) => file.fileKey)

    const components = await findFigmaComponents(fileKeys, accessToken)

    console.log(
      'components',
      components.map((c) => c.name)
    )

    await Promise.all(
      components.map(async (component) =>
        syncComponent(
          { designSystemId: designSystemId, component },
          {
            findComponentByName,
            updateComponent,
            deleteComponentVariants,
            createComponentVariant,
            createComponent,
          }
        )
      )
    )

    return components
  }
)

export async function FetchComponents({ designSystemSlug }: Props) {
  const designSystem = await findDesignSystemBySlug(designSystemSlug)

  if (!designSystem) throw new Error('Design system not found')

  const { accessToken } = await findFigmaDesignSystemCredentials(
    designSystem.id
  )

  const components = await cachedSync(designSystem.id, accessToken)

  return (
    <FetchIndicator
      title={`${components.length} components found`}
      details={components.map((c) => c.name)}
    />
  )
}
