import { compare, hash } from '@/lib/encryption'
import { UserToken } from '../entities/user-token'

const userPrefix = 'user_'

export async function generateUserToken(
  { userId }: { userId: string },
  {
    createUserToken,
  }: {
    createUserToken: (
      userId: string,
      token: string,
      prefix: string,
      description: string
    ) => Promise<void>
  }
) {
  const token = Buffer.from(crypto.randomUUID()).toString('base64')

  const prefix = `${userPrefix}${(Math.random() + 1).toString(36).substring(7)}`

  const hashedToken = await hash(token)

  await createUserToken(
    userId,
    hashedToken,
    prefix,
    'Connect Repository manually'
  )

  const userToken = `${prefix}-${token}`

  return userToken
}

export function isUserToken({ userToken }: { userToken: string }) {
  return userToken.startsWith(userPrefix)
}

export async function isValidUserToken(
  { userToken }: { userToken: string },
  {
    findUserTokenByToken,
  }: {
    findUserTokenByToken: (prefix: string) => Promise<UserToken | null>
  }
) {
  const [prefix, token] = userToken.split('-')

  const userTokenRecord = await findUserTokenByToken(prefix)

  if (!userTokenRecord) return false

  if (await compare(token, userTokenRecord.token)) {
    return userTokenRecord
  } else {
    return false
  }
}
