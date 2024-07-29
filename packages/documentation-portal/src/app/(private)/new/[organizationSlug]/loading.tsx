import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  params: { organizationSlug: string }
}

export default function NewDesignSystemFigmaPage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          <Skeleton className="rounded h-8 w-[100px]"></Skeleton>
        </CardTitle>
        <CardDescription>
          <Skeleton className="rounded h-3 full"></Skeleton>
          <Skeleton className="rounded mt-2 h-3 w-[100px]"></Skeleton>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="p-10 flex items-center justify-center">
          <Skeleton className="rounded h-[100px] w-full"></Skeleton>
        </p>
      </CardContent>
    </Card>
  )
}
