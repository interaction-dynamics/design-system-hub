import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { getProviders } from '@/adapters/providers'
import Typography from '@/components/atoms/typography'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { notFound } from 'next/navigation'

interface GeneralSettingsPageProps {
  params: { designSystemSlug: string }
}

export default async function GeneralSettingsPage({
  params,
}: GeneralSettingsPageProps) {
  const designSystem = await findDesignSystemBySlug(params.designSystemSlug)

  if (!designSystem) notFound()

  const providers = getProviders()

  return (
    <div>
      <Typography variant="h1">Integrations</Typography>
      <div className="space-y-5 mt-5">
        {providers.map((provider) => (
          <Card key={provider.name}>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-md font-semibold">{provider.name}</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    {provider.description}
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
