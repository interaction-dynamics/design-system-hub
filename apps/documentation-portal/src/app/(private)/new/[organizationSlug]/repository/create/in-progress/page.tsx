import { createEmptyDesignSystem } from '@/adapters/data-access/design-systems'
import { findOrganizationbySlug } from '@/adapters/data-access/organizations'
import { auth } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'

interface Props {
  params: { organizationSlug: string }
}

export default async function NewDesignSystemFigmaPage({ params }: Props) {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
    return
  }

  const organization = await findOrganizationbySlug(
    params.organizationSlug,
    userId
  )

  if (!organization) {
    notFound()
    return
  }

  const designSystemDao = await createEmptyDesignSystem(organization.id)

  if (designSystemDao) {
    redirect(
      `/new/${params.organizationSlug}/repository/${designSystemDao.slug}/connect`
    )
  }
}
