import { cache } from 'react'

import { PartialComponent } from '@/domain/entities/partial-component'
import { db } from '@/lib/db'
import { DesignSystemDao } from './design-systems'
import { Component } from '@/domain/entities/component'

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
