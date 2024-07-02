import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { PropsWithChildren } from 'react'
import { notFound } from 'next/navigation'
import { NameEditor } from './_components/name-editor'
import { SlugEditor } from './_components/slug-editor'

interface GeneralSettingsPageProps {
  params: { designSystemSlug: string }
}

export default async function GeneralSettingsPage({
  params,
}: GeneralSettingsPageProps) {
  const designSystem = await findDesignSystemBySlug(params.designSystemSlug)

  if (!designSystem) notFound()

  return (
    <div className="space-y-5">
      <NameEditor designSystem={designSystem} />
      <SlugEditor designSystem={designSystem} />
    </div>
  )
}
