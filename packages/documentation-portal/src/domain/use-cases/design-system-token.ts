import { compare, hash } from '@/lib/encryption'
import { DesignSystemToken } from '../entities/design-system-token'

const designSystemPrefix = 'ds_'

export async function generateDesignSystemToken(
  { designSystemId }: { designSystemId: string },
  {
    createDesignSystemToken,
  }: {
    createDesignSystemToken: (
      designSystemId: string,
      token: string,
      prefix: string,
      description: string
    ) => Promise<void>
  }
) {
  const token = Buffer.from(crypto.randomUUID()).toString('base64')

  const prefix = `${designSystemPrefix}${(Math.random() + 1)
    .toString(36)
    .substring(7)}`

  const hashedToken = await hash(token)

  await createDesignSystemToken(
    designSystemId,
    hashedToken,
    prefix,
    'Connect Repository manually (generated automatically in the setup process)'
  )

  const designSystemToken = `${prefix}-${token}`

  return designSystemToken
}

function isDesignSystemToken({ token: designSystemToken }: { token: string }) {
  return designSystemToken.startsWith(designSystemPrefix)
}

export async function isValidDesignSystemToken(
  { token: designSystemToken }: { token: string },
  {
    findDesignSystemTokenByToken,
  }: {
    findDesignSystemTokenByToken: (
      prefix: string
    ) => Promise<DesignSystemToken | null>
  }
) {
  console.log('designSystemToken', designSystemToken)

  if (!isDesignSystemToken({ token: designSystemToken })) return false

  const [prefix, token] = designSystemToken.split('-')

  const designSystemTokenRecord = await findDesignSystemTokenByToken(prefix)

  console.log('designSystemTokenRecord', designSystemTokenRecord)

  if (!designSystemTokenRecord) return false

  if (await compare(token, designSystemTokenRecord.token)) {
    return designSystemTokenRecord
  } else {
    return false
  }
}
