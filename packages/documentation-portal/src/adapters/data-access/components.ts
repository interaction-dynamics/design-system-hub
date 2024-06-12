import { cache } from 'react'

import { PartialComponent } from '@/domain/entities/partial-component'
import { db } from '@/lib/db'
import { DesignSystemDao } from './design-systems'
import { Component } from '@/domain/entities/component'
import generateSlug from '@/lib/generate-slug'

export const findPartialComponents = cache(
  async (designSystem: DesignSystemDao): Promise<PartialComponent[]> => {
    const componentDaos = await db.component.findMany({
      where: { designSystemId: designSystem.id },
    })

    return componentDaos
      .map((componentDao) => ({
        name: componentDao.name,
        slug: componentDao.slug,
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }
)

export const findComponent = cache(
  async (
    designSystem: DesignSystemDao,
    componentSlug: string
  ): Promise<Component> => {
    const componentDao = await db.component.findUniqueOrThrow({
      where: { designSystemId: designSystem.id, slug: componentSlug },
      include: { variants: true },
    })

    return {
      id: componentDao.id,
      name: componentDao.name,
      slug: componentDao.slug,
      properties: componentDao.properties.map((propertyDao) => ({
        name: propertyDao.name,
        type: propertyDao.type,
        description: propertyDao.description,
        defaultValue: propertyDao.defaultValue,
        ...(propertyDao.optional ? { optional: true } : {}),
        ...(propertyDao.deprecated ? { deprecated: true } : {}),
      })),
      providers: componentDao.providers as any,
      variants: componentDao.variants.map((variantDao) => ({
        name: variantDao.name,
        slug: variantDao.slug,
        providers: variantDao.providers as any,
      })),
    }
  }
)

export const findComponentByName = cache(
  async (
    designSystemId: string,
    componentName: string
  ): Promise<Component | undefined> => {
    const componentDao = await db.component.findFirst({
      where: { designSystemId, name: componentName },
      include: { variants: true },
    })

    if (!componentDao) return undefined

    return {
      id: componentDao.id,
      name: componentDao.name,
      slug: componentDao.slug,
      properties: componentDao.properties.map((propertyDao) => ({
        name: propertyDao.name,
        type: propertyDao.type,
        description: propertyDao.description,
        defaultValue: propertyDao.defaultValue,
        ...(propertyDao.optional ? { optional: true } : {}),
        ...(propertyDao.deprecated ? { deprecated: true } : {}),
      })),
      providers: componentDao.providers as any,
      variants: componentDao.variants.map((variantDao) => ({
        name: variantDao.name,
        slug: variantDao.slug,
        providers: variantDao.providers as any,
      })),
    }
  }
)

// export const updateComponentProvider = cache(
//   async <T extends object>(
//     designSystemId: string,
//     componentName: string,
//     providerKey: string,
//     providerValue: T
//   ) => {
//     await db.component.updateMany({
//       where: { designSystemId, name: componentName },
//       data: {
//         providers: {
//           [providerKey]: providerValue,
//         },
//       },
//     })
//   }
// )

export const updateComponent = async (
  designSystemId: string,
  componentName: string,
  values: Partial<Component>
) => {
  await db.component.updateMany({
    where: { designSystemId, name: componentName },
    data: {
      ...values,
    },
  })
}

export async function createComponent(
  designSystemId: string,
  values: Pick<Component, 'name' | 'providers' | 'properties'>
): Promise<{ id: string }> {
  return await db.component.create({
    data: {
      ...values,
      designSystemId,
      slug: generateSlug(values.name),
      properties: values.properties.map((property) => ({
        name: property.name,
        type: property.type,
        description: property.description,
        defaultValue: property.defaultValue,
        ...(property.optional ? { optional: true } : {}),
        ...(property.deprecated ? { deprecated: true } : {}),
      })),
    },
  })
}
