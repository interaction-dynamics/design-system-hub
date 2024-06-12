import { fetchDesignSystem } from '@/adapters/providers/figma/actions/fetch-design-system'
import {
  createComponent,
  findComponentByName,
  updateComponent,
} from '@/adapters/data-access/components'

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
    } else {
      await createComponent(designSystemId, {
        name: component.name,
        providers: {
          ...component.providers,
        },
        properties: [],
      })

      // if (component.variants) {
      //   component.variants.forEach(async (variant) => {
      //     const foundVariant = await findComponentByName(
      //       designSystemId,
      //       variant.name
      //     )

      //     if (foundVariant) {
      //       await updateComponent(designSystemId, variant.name, {
      //         providers: {
      //           ...foundVariant.providers,
      //           ...variant.providers,
      //         },
      //       })
      //     } else {
      //       await createComponent(designSystemId, {
      //         name: variant.name,
      //         providers: {
      //           ...variant.providers,
      //         },
      //         properties: [],
      //       })
      //     }
      //   })
      // }
    }
  })

  return Response.json({ status: 'ok' })
}
