import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FetchComponents } from './_components/fetch-components'
import { Suspense } from 'react'
import { Accordion } from '@/components/ui/accordion'
import { FetchStyles } from './_components/fetch-styles'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FetchIndicator } from '@/components/organisms/fetch-indicator'

interface Props {
  params: { designSystemSlug: string; organizationSlug: string }
}

export default function NewDesignSystemFigmaPage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Detecting design system</CardTitle>
        <CardDescription>
          We extract your design system from Figma.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <Suspense
            fallback={<FetchIndicator loading title="Searching components" />}
          >
            <FetchComponents designSystemSlug={params.designSystemSlug} />
          </Suspense>
          <Suspense
            fallback={<FetchIndicator loading title="Searching styles" />}
          >
            <FetchStyles designSystemSlug={params.designSystemSlug} />
          </Suspense>
        </Accordion>
        <div className="flex justify-end mt-5">
          <Button asChild>
            <Link
              href={`/new/${params.organizationSlug}/repository/${params.designSystemSlug}/connect`}
            >
              Let&apos;s continue
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
