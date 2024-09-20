import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { productName } from '@/config/names'
import Link from 'next/link'

interface Props {
  params: { organizationSlug: string }
}

export default function NewDesignSystemFigmaPage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Connect Repository</CardTitle>
        <CardDescription>
          In order to maintain your design system, {productName} needs to access
          your React code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="p-10 flex items-center justify-center">
          <Button>
            <Link
              href={`/new/${params.organizationSlug}/repository/create/in-progress`}
            >
              Connect code
            </Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  )
}
