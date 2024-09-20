import type { NextRequest } from 'next/server'
import { User } from '@/domain/entities/user'
import { isValidUserToken } from '@/domain/use-cases/user-token'
import { findUserTokenByToken } from '@/adapters/data-access/user-token'

export async function getUser(request: NextRequest): Promise<User | undefined> {
  const authorization = request.headers.get('Authorization')

  if (authorization?.startsWith('Token')) {
    return undefined
  }

  const token = authorization?.replace('Token ', '') ?? ''

  const userTokenRecord = await isValidUserToken(
    { userToken: token },
    { findUserTokenByToken }
  )

  if (!userTokenRecord) return undefined

  return {
    id: userTokenRecord?.userId ?? '',
    name: '',
    email: '',
    slug: '',
  }
}
