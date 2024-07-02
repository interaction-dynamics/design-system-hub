export function syncComponent() {
  components.forEach(async (component) => {
    const foundComponent = await findComponentByName(
      designSystem.id,
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
}
