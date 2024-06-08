import { z } from 'zod'
import { updateDesignSystemProvider } from '@/adapters/data-access/design-systems'

import { NextRequest } from 'next/server'
import { getUser } from '../../_utils/get-user'
import {
  updateComponent,
} from '@/adapters/data-access/components'

const validator = z.object({
  designSystemId: z.string(),
  organizationId: z.string(),
  designSystem: z.object({
    provider: z.object({
      relativePath: z.string(),
      url: z.string(),
    }),
    components: z.array(
      z.object({
        name: z.string(),
        properties: z.array(z.object({
          name: z.string(),
          type: z.string(),
          description: z.string(),
          optional: z.boolean(),
          defaultValue: z.string().optional(),
        })),
      })
    )
  }),
})

export async function POST(request: NextRequest) {
  const user = await getUser(request)

  if (!user) {
    return Response.json({ error: 'Forbidden' }, { status: 401 })
  }

  const body = await request.json()

  if (!validator.safeParse(body).success) {
    return Response.json({ error: 'Bad Request' }, { status: 400 })
  }

  const { designSystem } = body

  await updateDesignSystemProvider(body.designSystemId, 'code', {
    relativePath: designSystem.provider.relativePath,
    url: designSystem.provider.url,
  })

  designSystem.components.forEach(async (component) => {
    await updateComponent(body.designSystemId, component.name, {
      providers: {
        code: {
          relativePath: component.provider.relativePath,
          url: component.provider.url,
        },
      },
      properties: component.properties.
    })
  })

  await updateComponentProvider(body.designSystemId)

  return Response.json({ status: 'ok', success: true })
}
