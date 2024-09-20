import { db } from '@/lib/db'
import { cleanPageTitle } from '@/domain/use-cases/page'
import { generateSlug } from '@/lib/generate-slug'

export const createPage = async (
  filePath: string,
  provider: string,
  content: string,
  designSystemId: string,
  order: number
) => {
  const title = cleanPageTitle({ filePath })

  await db.page.create({
    data: {
      designSystemId,
      path: filePath,
      provider,
      content,
      slug: generateSlug(title),
      title,
      order,
    },
  })
}

export const deletePages = async (designSystemId: string) => {
  await db.page.deleteMany({
    where: {
      designSystemId,
    },
  })
}

export const findPagesBySlug = async (slug: string, designSystemId: string) => {
  return await db.page.findMany({
    where: {
      slug,
      designSystemId,
    },
  })
}

export const findAllPages = async (designSystemId: string) => {
  return await db.page.findMany({
    where: {
      designSystemId,
    },
    orderBy: {
      order: 'asc',
    },
  })
}
