import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { notFound } from 'next/navigation'
import { NameEditor } from './_components/name-editor'
import { SlugEditor } from './_components/slug-editor'
import Typography from '@/components/atoms/typography'
import { DangerZone } from './_components/danger-zone'

interface GeneralSettingsPageProps {
  params: { designSystemSlug: string }
}

export default async function GeneralSettingsPage({
  params,
}: GeneralSettingsPageProps) {
  const designSystem = await findDesignSystemBySlug(params.designSystemSlug)

  if (!designSystem) notFound()

  return (
    <div className="space-y-5 pb-5">
      <NameEditor designSystem={designSystem} />
      <SlugEditor designSystem={designSystem} />
      <Typography variant="h3">Danger zone</Typography>
      <DangerZone designSystem={designSystem} />
    </div>
  )
}
