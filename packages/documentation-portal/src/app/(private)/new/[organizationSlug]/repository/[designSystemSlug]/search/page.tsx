import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Accordion } from '@/components/ui/accordion'
import { Suspense } from 'react'
import { FetchIndicator } from '../../../_components/fetch-indicator'
import { ComponentList } from './_components/component-list'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
  params: { designSystemSlug: string; organizationSlug: string }
}

export default async function NewDesignSystemFigmaPage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Detecting design system</CardTitle>
        <CardDescription>
          We extract your design system from your code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <Suspense
            fallback={<FetchIndicator loading title="Searching components" />}
          >
            <ComponentList designSystemSlug={params.designSystemSlug} />
          </Suspense>
        </Accordion>
        <div className="flex justify-end mt-5">
          <Button asChild>
            <Link
              href={`/new/${params.organizationSlug}/setup/${params.designSystemSlug}`}
            >
              Let&apos;s continue
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
