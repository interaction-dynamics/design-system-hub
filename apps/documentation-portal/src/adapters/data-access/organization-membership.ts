import { db } from '@/lib/db'

export function findOrganizationMembership(
  userId: string,
  organizationId: string
) {
  return db.organizationMembership.findFirst({
    where: {
      organizationId,
      userId,
    },
  })
}
