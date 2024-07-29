import { UserToken } from '@/domain/entities/user-token'
import { db } from '@/lib/db'

export async function createUserToken(
  userId: string,
  token: string,
  prefix: string,
  description: string
): Promise<void> {
  await db.userToken.create({
    data: { userId, prefix, token, description },
  })
}

export async function findUserTokenByToken(
  prefix: string
): Promise<UserToken | null> {
  const token = await db.userToken.findFirst({ where: { prefix } })

  if (!token) return null

  return {
    userId: token.userId,
    prefix: token.prefix,
    token: token.token,
    description: token.description,
  }
}
