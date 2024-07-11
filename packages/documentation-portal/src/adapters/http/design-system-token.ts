import { NextRequest } from 'next/server'

import { isValidDesignSystemToken } from '@/domain/use-cases/design-system-token'
import { findDesignSystemTokenByToken } from '@/adapters/data-access/design-system-token'

export async function getDesignSystemToken(request: NextRequest) {
  const authorization = request.headers.get('Authorization') ?? ''

  console.log(
    'authorization',
    authorization,
    authorization.trim().startsWith('Token')
  )

  if (!authorization.trim().startsWith('Token')) return undefined

  const token = authorization?.replace('Token ', '') ?? ''

  const designSystemTokenRecord = await isValidDesignSystemToken(
    { token },
    { findDesignSystemTokenByToken }
  )

  return designSystemTokenRecord
}
