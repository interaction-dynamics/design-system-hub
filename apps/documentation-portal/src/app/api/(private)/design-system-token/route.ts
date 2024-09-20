import { NextRequest } from 'next/server'
import { findDesignSystemById } from '@/adapters/data-access/design-systems'
import { generateDesignSystemToken } from '@/domain/use-cases/design-system-token'
import { createDesignSystemToken } from '@/adapters/data-access/design-system-token'
import { getSyncCommand } from '@/adapters/providers/code/utils/get-commands'

export async function POST(request: NextRequest) {
  const { designSystemId } = await request.json()

  const designSystem = await findDesignSystemById(designSystemId)

  if (!designSystem) return Response.json({ success: false })

  const designSystemToken = await generateDesignSystemToken(
    { designSystemId: designSystem.id },
    { createDesignSystemToken }
  )

  return Response.json({ token: designSystemToken, success: false })
}
