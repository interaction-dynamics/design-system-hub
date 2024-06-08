import { db } from '@/lib/db'
import { cache } from 'react'

import { DesignSystem } from '@/domain/entities/design-system'
import { Component } from '@/domain/entities/component'

export interface DesignSystemDao extends DesignSystem {
  id: string
}

export async function createDesignSystem(
  designSystem: DesignSystem,
  components: Component[]
) {
  const designSystemDao = await db.designSystem.create({
    data: {
      name: designSystem.name,
      slug: designSystem.slug,
      providers: {},
    },
  })

  const componentDaos = []

  for (const component of components) {
    const componentDao = await db.component.create({
      data: {
        name: component.name,
        slug: component.slug,
        properties: component.properties.map((property) => ({
          name: property.name,
          type: property.type,
          description: property.description,
          defaultValue: property.defaultValue.toString(),
        })),
        designSystemId: designSystemDao.id,
        providers: component.providers,
      },
    })

    componentDaos.push(componentDao)

    const variantsDao = []

    for (const variant of component.variants) {
      const variantDao = await db.componentVariant.create({
        data: {
          name: variant.name,
          slug: variant.slug,
          providers: variant.providers,
          componentId: componentDao.id,
        },
      })

      variantsDao.push(variantDao)
    }

    if (variantsDao.length > 0) {
      await db.component.update({
        where: { id: componentDao.id },
        data: {
          variants: {
            connect: variantsDao.map((variant) => ({ id: variant.id })),
          },
        },
      })
    }
  }

  await db.designSystem.update({
    where: { id: designSystemDao.id },
    data: {
      components: {
        connect: componentDaos.map((componentDao) => ({ id: componentDao.id })),
      },
    },
  })
}

export const findDesignSystemBySlug = cache(
  async (slug: string): Promise<DesignSystem | null> => {
    const designSystemDao = await db.designSystem.findUnique({
      where: { slug },
    })

    if (!designSystemDao) return null

    return {
      id: designSystemDao.id,
      name: designSystemDao.name,
      slug: designSystemDao.slug,
    }
  }
)

export const findAllDesignSystemsByOrganizationId = cache(
  async (
    organizationId: string
  ): Promise<Array<Pick<DesignSystem, 'id' | 'name'>>> => {
    const designSystemDaos = await db.designSystem.findMany()

    return designSystemDaos.map((designSystemDao) => ({
      id: designSystemDao.id,
      name: designSystemDao.name,
    }))
  }
)

export async function updateDesignSystemProvider<T extends object>(
  designSystemId: string,
  providerKey: string,
  providerValue: T
) {
  await db.designSystem.update({
    data: {
      providers: {
        [providerKey]: providerValue,
      },
    },
    where: { id: designSystemId },
  })
}
