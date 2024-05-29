import { createDesignSystem } from '@/adapters/data-access/design-systems'
import { syncDesignSystem } from '@/domain/use-cases/sync-design-system'
import { fetchDesignSystem } from '@/adapters/providers/figma/actions/fetch-design-system'

export async function POST() {
  await syncDesignSystem(
    {
      fetchDesignSystem,
      createDesignSystem,
    },
    { ids: process.env.FIGMA_FILE_IDS?.split(',') ?? [] }
  )

  return Response.json({ status: 'ok' })
}
