import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'
import { findOrganizationbySlug } from '@/adapters/data-access/organizations'
import { Card, CardContent } from '@/components/ui/card'
import { findAllDesignSystemsByOrganizationId } from '@/adapters/data-access/design-systems'
import { Button } from '@/components/ui/button'

interface Props {
  organizationSlug: string
}

export async function DesignSystemList({ organizationSlug }: Props) {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
    return
  }

  const organization = await findOrganizationbySlug(organizationSlug, userId)

  if (!organization) {
    notFound()
    return
  }

  const designSystemList = await findAllDesignSystemsByOrganizationId(
    organization.id
  )

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
