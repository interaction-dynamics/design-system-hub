import { cache } from 'react'

import { PartialComponent } from '@/domain/entities/partial-component'
import { db } from '@/lib/db'
import { DesignSystemDao } from './design-systems'
import { Component } from '@/domain/entities/component'
import { Property } from '@/domain/entities/property'
import { DesignSystem } from '@/domain/entities/design-system'

export const findPartialComponents = cache(
  async (designSystem: DesignSystemDao): Promise<PartialComponent[]> => {
    const componentDaos = await db.component.findMany({
      where: { designSystemId: designSystem.id },
    })

    return componentDaos.map((componentDao) => ({
      name: componentDao.name,
      slug: componentDao.slug,
    }))
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
      name: componentDao.name,
      slug: componentDao.slug,
      properties: componentDao.properties.map((propertyDao) => ({
        name: propertyDao.name,
        type: propertyDao.type,
        description: propertyDao.description,
        defaultValue: propertyDao.defaultValue,
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
      name: componentDao.name,
      slug: componentDao.slug,
      properties: componentDao.properties.map((propertyDao) => ({
        name: propertyDao.name,
        type: propertyDao.type,
        description: propertyDao.description,
        defaultValue: propertyDao.defaultValue,
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

export const updateComponent = cache(
  async (
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
)
