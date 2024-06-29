import { generateAccessToken } from '@/adapters/providers/figma/actions/generate-access-token'
import { createEmptyDesignSystem } from '@/adapters/data-access/design-systems'
import { createFigmaDesignSystemCredentials } from '@/adapters/data-access/figma-design-system-credentials'
import { redirect } from 'next/navigation'
import { callbackUrl } from '../_utils/url'

export default async function Page({
  searchParams,
}: {
  searchParams: { code: string; state: string }
}) {
  const newSearchParams = new URLSearchParams(searchParams)

  // redirect(
  //   `http://${
  //     searchParams.state
  //   }/design-system/new/figma/callback/?${newSearchParams.toString()}`
  // )

  const credentials = await generateAccessToken(callbackUrl, searchParams.code)

  console.warn('credentials', credentials)

  const designSystemDao = await createEmptyDesignSystem()

  console.warn('designSystemDao', designSystemDao)

  const response = await createFigmaDesignSystemCredentials(
    credentials,
    designSystemDao.id
  )

  console.log('response', response)

  if (response) {
    redirect(`/design-system/new/figma/choose-files/${designSystemDao.slug}`)
  }

  return (
    <div className="fixed inset-0 bg-backgroun z-50 flex text-foreground items-center justify-center" />
  )
}
