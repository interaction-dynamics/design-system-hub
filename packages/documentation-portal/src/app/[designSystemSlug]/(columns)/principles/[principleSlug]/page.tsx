import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findPagesBySlug } from '@/adapters/data-access/page'
import { Markdown } from '@/components/atoms/markdown'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    designSystemSlug: string
    principleSlug: string
  }
}

export default async function FoundationPage({ params }: PageProps) {
  const designSystem = await findDesignSystemBySlug(params.designSystemSlug)

  if (!designSystem) notFound()
  const pages = await findPagesBySlug(params.principleSlug, designSystem.id)

  return (
    <div className="pb-10">
      {pages.map((page) => (
        <Markdown key={page.id}>{page.content}</Markdown>
      ))}
    </div>
  )
}
