import { redirect } from 'next/navigation'

import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findPartialComponents } from '@/adapters/data-access/components'

interface PageProps {
  params: {
    designSystemSlug: string
  }
}

export default async function RedirectToFirstComponentPage({
  params,
}: PageProps) {
  const designSystem = await findDesignSystemBySlug(params.designSystemSlug)
  if (!designSystem) redirect('/')
  const partialComponents = await findPartialComponents(designSystem)

  redirect(`components/${partialComponents?.[0].slug}`)
}
