import { redirect } from 'next/navigation'

import getDesignSystem from '../../../providers/figma/features/files/getDesignSystem'

interface PageProps {
  params: {
    designSystemSlug: string
  }
}

export default async function RedirectToFirstComponentPage({
  params,
}: PageProps) {
  const designSystem = await getDesignSystem(params.designSystemSlug)
  redirect(`components/${designSystem.components?.[0].slug}`)
}
