import { generateAccessToken } from '@/adapters/providers/figma/actions/credentials'
import { createEmptyDesignSystem } from '@/adapters/data-access/design-systems'
import { createFigmaDesignSystemCredentials } from '@/adapters/data-access/figma-design-system-credentials'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { findOrganizationbySlug } from '@/adapters/data-access/organizations'

export default async function Page({
  searchParams,
}: {
  searchParams: { code: string; state: string }
}) {
  const newSearchParams = new URLSearchParams(searchParams)

  const { organizationSlug, callbackUrl } = JSON.parse(searchParams.state)

  const credentials = await generateAccessToken(callbackUrl, searchParams.code)

  const { userId } = auth()

  if (!userId) {
    redirect('/')
    return
  }

  const organization = await findOrganizationbySlug(organizationSlug, userId)

  if (!organization) {
    notFound()
    return
  }

  const designSystemDao = await createEmptyDesignSystem(organization.id)

  const response = await createFigmaDesignSystemCredentials(
    credentials,
    designSystemDao.id
  )

  if (response) {
    redirect(
      `/new/${organizationSlug}/figma/choose-files/${designSystemDao.slug}`
    )
  }

  return (
    <div className="fixed inset-0 bg-backgroun z-50 flex text-foreground items-center justify-center" />
  )
}
