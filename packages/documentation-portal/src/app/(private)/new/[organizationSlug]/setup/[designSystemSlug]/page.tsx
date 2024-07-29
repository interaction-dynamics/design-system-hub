import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FormInputServer } from './_components/form-input-server'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  params: { designSystemSlug: string }
}

export default function NewDesignSystemSetupPage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Last setup</CardTitle>
        <CardDescription>
          Few last information are required before enjoying your design system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-full h-10" />}>
          <FormInputServer designSystemSlug={params.designSystemSlug} />
        </Suspense>
      </CardContent>
    </Card>
  )
}
