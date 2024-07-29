import { isValidUserToken } from '@/domain/use-cases/user-token'
import { NextRequest } from 'next/server'
import { findUserTokenByToken } from '@/adapters/data-access/user-token'

export async function POST(request: NextRequest) {
  const { token } = await request.json()

  const success = await isValidUserToken(
    { userToken: token },
    { findUserTokenByToken }
  )

  return Response.json({
    success,
  })
}
