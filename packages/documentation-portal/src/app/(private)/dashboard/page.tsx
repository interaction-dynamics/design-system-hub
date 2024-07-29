import {
  createOrganization,
  findAllOrganizationsByUserId,
} from '@/adapters/data-access/organizations'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function Page() {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
    return
  }

  const organizations = await findAllOrganizationsByUserId(userId)

  if (organizations.length > 0) {
    redirect(`/dashboard/${organizations[0].slug}`)
  }

  const organization = await createOrganization({
    name: 'Default',
    slug: 'default',
    ownerId: userId,
  })

  redirect(`/dashboard/${organization.slug}`)
}
