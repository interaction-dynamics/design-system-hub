import { Organization } from '@/domain/entities/organization'
import { db } from '@/lib/db'

export async function findAllOrganizationsByUserId(userId: string) {
  console.log('userId', userId)

  const memberships = await db.organizationMembership.findMany({
    where: {
      userId,
    },
  })

  const organizations = await db.organization.findMany({
    where: {
      id: {
        in: memberships.map((membership) => membership.organizationId),
      },
    },
  })

  return organizations
}

export async function findOrganizationbySlug(
  organizationSlug: string,
  userId: string
) {
  const memberships = await db.organizationMembership.findMany({
    where: {
      userId,
    },
  })

  const organizations = await db.organization.findFirst({
    where: {
      id: {
        in: memberships.map((membership) => membership.organizationId),
      },
      slug: organizationSlug,
    },
  })

  return organizations
}

export async function createOrganization(
  data: Partial<Organization> &
    Pick<Organization, 'name' | 'slug'> & { ownerId: string }
) {
  const organization = await db.organization.create({
    data,
  })

  await db.organizationMembership.create({
    data: {
      userId: data.ownerId,
      organizationId: organization.id,
      role: 'owner',
    },
  })

  return organization
}
