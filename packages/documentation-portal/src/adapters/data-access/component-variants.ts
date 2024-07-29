import { ComponentVariant } from '@/domain/entities/component-variant'
import { db } from '@/lib/db'

export const deleteComponentVariants = async (componentId: string) => {
  await db.componentVariant.deleteMany({
    where: { componentId },
  })
}

export const createComponentVariant = async (
  componentId: string,
  values: ComponentVariant
) => {
  await db.componentVariant.create({
    data: {
      componentId,
      slug: values.slug,
      name: values.name,
      providers: values.providers as any,
    },
  })
}
