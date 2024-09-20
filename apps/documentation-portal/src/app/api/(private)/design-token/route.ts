import { findAllStyles } from '@/adapters/data-access/styles'
import { getDesignSystemToken } from '@/adapters/http/design-system-token'
import { generateDesignTokens } from '@/domain/use-cases/design-token'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const designSystemToken = await getDesignSystemToken(request)

  if (!designSystemToken) {
    return Response.json({ error: 'Forbidden' }, { status: 401 })
  }

  const styles = await findAllStyles(designSystemToken.designSystemId)

  const tokens = generateDesignTokens({ styles })

  return Response.json({ tokens, success: true })
}
