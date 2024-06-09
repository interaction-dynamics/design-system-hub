import { z } from 'zod'
import { updateDesignSystemProvider } from '@/adapters/data-access/design-systems'

import { NextRequest } from 'next/server'
import { getUser } from '../../_utils/get-user'
import {
  findComponentByName,
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
        path: z.string(),
        properties: z.array(
          z.object({
            name: z.string(),
            type: z.string(),
            description: z.string(),
            optional: z.boolean(),
            defaultValue: z.string().optional(),
          })
        ),
      })
    ),
  }),
})

interface ReturnedDesignSystem {
  designSystemId: string
  organizationId: string
  designSystem: {
    provider: {
      relativePath: string
      url: string
    }
    components: {
      name: string
      path: string
      description: string
      properties: {
        name: string
        type: string
        description: string
        optional: boolean
        defaultValue: string | undefined
      }[]
    }[]
  }
}

export async function POST(request: NextRequest) {
  const user = await getUser(request)

  if (!user) {
    return Response.json({ error: 'Forbidden' }, { status: 401 })
  }

  const body: ReturnedDesignSystem = await request.json()

  if (!validator.safeParse(body).success) {
    return Response.json({ error: 'Bad Request' }, { status: 400 })
  }

  const { designSystem } = body

  await updateDesignSystemProvider(body.designSystemId, 'code', {
    relativePath: designSystem.provider.relativePath,
    url: designSystem.provider.url,
  })

  designSystem.components.forEach(async (component) => {
    const foundComponent = await findComponentByName(
      body.designSystemId,
      component.name
    )

    if (foundComponent) {
      await updateComponent(body.designSystemId, component.name, {
        providers: {
          ...foundComponent.providers,
          code: {
            path: component.path,
            description: component.description,
          },
        },
        properties: component.properties.map((property) => {
          return {
            name: property.name,
            type: property.type,
            description: property.description,
            optional: property.optional ?? false,
            defaultValue: property.defaultValue ?? undefined,
          }
        }),
      })
    }
  })

  return Response.json({ status: 'ok', success: true })
}
