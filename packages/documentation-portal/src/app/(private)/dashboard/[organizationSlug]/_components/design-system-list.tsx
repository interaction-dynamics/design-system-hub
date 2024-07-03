import { Card, CardContent } from '@/components/ui/card'
import { findAllDesignSystemsByOrganizationId } from '@/adapters/data-access/design-systems'
import Link from 'next/link'

export async function DesignSystemList() {
  const designSystemList = await findAllDesignSystemsByOrganizationId('dds')

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {designSystemList.map((designSystem) => (
        <Link href={`/${designSystem.slug}`} key={designSystem.id}>
          <Card className="hover:bg-primary-foreground cursor-pointer">
            <CardContent className="py-4">
              <div className="text-md text-card-foreground">
                {designSystem.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }).format(designSystem.updatedAt)}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
