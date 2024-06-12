import { fetchDesignSystem } from '@/adapters/providers/figma/actions/fetch-design-system'
import {
  createComponent,
  findComponentByName,
  updateComponent,
} from '@/adapters/data-access/components'
import {
  createComponentVariant,
  deleteComponentVariants,
} from '@/adapters/data-access/component-variants'

export async function POST() {
  const designSystem = await fetchDesignSystem(
    process.env.FIGMA_FILE_IDS?.split(',') ?? []
  )

  const designSystemId = '665701b6735feee3ac27825d'

  designSystem.components.forEach(async (component) => {
    const foundComponent = await findComponentByName(
      designSystemId,
      component.name
    )

    if (foundComponent) {
      await updateComponent(designSystemId, component.name, {
        providers: {
          ...foundComponent.providers,
          ...component.providers,
        },
      })

      await deleteComponentVariants(foundComponent.id)
      if (component.variants) {
        component.variants.forEach(async (variant) => {
          await createComponentVariant(foundComponent.id, variant)
        })
      }
    } else {
      const newComponent = await createComponent(designSystemId, {
        name: component.name,
        providers: {
          ...component.providers,
        },
        properties: [],
      })

      await deleteComponentVariants(newComponent.id)

      if (component.variants) {
        component.variants.forEach(async (variant) => {
          await createComponentVariant(newComponent.id, variant)
        })
      }
    }
  })

  return Response.json({ status: 'ok' })
}
