import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { getProvider } from '@/adapters/providers'
import Typography from '@/components/atoms/typography'
import { notFound } from 'next/navigation'

interface GeneralSettingsPageProps {
  params: { designSystemSlug: string; providerId: string }
}

export default async function IntegrationSettings({
  params,
}: GeneralSettingsPageProps) {
  const designSystem = await findDesignSystemBySlug(params.designSystemSlug)

  if (!designSystem) notFound()

  const provider = getProvider(params.providerId)

  if (!provider) notFound()

  const Component = provider.getSettings()

  return (
    <div>
      <Typography variant="h1">{provider.name}</Typography>
      <div className="pt-5">
        {<Component designSystemId={designSystem.id} />}
      </div>
    </div>
  )
}
