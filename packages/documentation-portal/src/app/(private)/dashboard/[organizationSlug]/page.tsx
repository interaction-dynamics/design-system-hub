import { Suspense } from 'react'
import { DesignSystemList } from './_components/design-system-list'
import { TeamSwitcherServer } from './_components/team-switcher-server'
import { Skeleton } from '@/components/ui/skeleton'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CirclePlus } from 'lucide-react'

interface Props {
  params: { organizationSlug: string }
}

export default function DashboardPage({ params }: Props) {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
    return
  }

  return (
    <div className="container py-10">
      <div>
        <div className="flex items-stretch gap-4">
          <Suspense
            fallback={<Skeleton className="rounded h-[36px] w-[200px]" />}
          >
            <TeamSwitcherServer organizationSlug={params.organizationSlug} />
          </Suspense>
          <Button asChild>
            <Link href={`/new/${params.organizationSlug}`}>
              <CirclePlus className="mr-2 h-4 w-4 opacity-100" />
              Create Design System
            </Link>
          </Button>
        </div>
        <div className="pt-4" />
        <Suspense
          fallback={<Skeleton className="rounded h-[100px] w-[300px]" />}
        >
          <DesignSystemList organizationSlug={params.organizationSlug} />
        </Suspense>
      </div>
    </div>
  )
}
