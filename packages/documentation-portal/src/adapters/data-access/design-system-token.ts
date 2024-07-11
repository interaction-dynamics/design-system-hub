import { DesignSystemToken } from '@/domain/entities/design-system-token'
import { db } from '@/lib/db'

export async function createDesignSystemToken(
  designSystemId: string,
  token: string,
  prefix: string,
  description: string
): Promise<void> {
  await db.designSystemToken.create({
    data: { designSystemId, prefix, token, description },
  })
}

export async function findDesignSystemTokenByToken(
  prefix: string
): Promise<DesignSystemToken | null> {
  const token = await db.designSystemToken.findFirst({ where: { prefix } })

  if (!token) return null

  return {
    designSystemId: token.designSystemId,
    prefix: token.prefix,
    token: token.token,
    description: token.description,
  }
}
