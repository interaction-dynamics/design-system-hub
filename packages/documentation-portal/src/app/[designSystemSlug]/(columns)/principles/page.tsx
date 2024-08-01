import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findAllPages } from '@/adapters/data-access/page'
import { notFound, redirect } from 'next/navigation'

interface PageProps {
  params: {
    designSystemSlug: string
  }
}

export default async function RedirectToFirstComponentPage({
  params,
}: PageProps) {
  const designSystem = await findDesignSystemBySlug(params.designSystemSlug)

  if (!designSystem) notFound()
  const pages = await findAllPages(designSystem.id)

  redirect(`principles/${pages[0].slug}`)
}
