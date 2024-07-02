import { Component } from '../entities/component'
import { ComponentVariant } from '../entities/component-variant'

export async function syncComponent(
  {
    component,
    designSystemId,
  }: { component: Component; designSystemId: string },
  {
    findComponentByName,
    updateComponent,
    deleteComponentVariants,
    createComponentVariant,
    createComponent,
  }: {
    findComponentByName: (
      designSystemId: string,
      name: string
    ) => Promise<Component | undefined>
    updateComponent: (
      designSystemId: string,
      name: string,
      component: Partial<Component>
    ) => Promise<void>
    deleteComponentVariants: (componentId: string) => Promise<void>
    createComponentVariant: (
      componentId: string,
      variant: ComponentVariant
    ) => Promise<void>
    createComponent: (
      designSystemId: string,
      component: Pick<Component, 'name' | 'providers' | 'properties'>
    ) => Promise<{ id: string }>
  }
) {
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
      await Promise.all(
        component.variants.map((variant) =>
          createComponentVariant(foundComponent.id, variant)
        )
      )
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
}
