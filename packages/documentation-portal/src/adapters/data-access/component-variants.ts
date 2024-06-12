import { ComponentVariant } from '@/domain/entities/component-variant'
import { db } from '@/lib/db'
import generateSlug from '@/lib/generate-slug'

export const deleteComponentVariants = async (componentId: string) => {
  const componentDaos = await db.componentVariant.deleteMany({
    where: { componentId },
  })
}

export const createComponentVariant = async (
  componentId: string,
  values: ComponentVariant
) => {
  const componentDaos = await db.componentVariant.create({
    data: {
      componentId,
      slug: values.name,
      name: values.name,
      providers: values.providers as any,
    },
  })
}
