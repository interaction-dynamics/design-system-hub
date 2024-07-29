import Typography from '@/components/atoms/typography'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CirclePlus } from 'lucide-react'
import Link from 'next/link'

export default async function Welcome() {
  return (
    <div className="container py-10 flex flex-col items-center">
      <Card className="max-w-md">
        <CardHeader>
          <Typography variant="h1" className="text-center">
            Welcome
          </Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="p">
            <strong>DesignSystemHub</strong> is a new project to manage design
            systems that is currently in development. You are entering the beta
            which may contain bugs.
          </Typography>
          <Typography variant="p" as="div" className="mt-2">
            We kindly suggest you to:
            <ul>
              <li>- Report any issue you experience</li>
              <li>- Do not store sensitive data</li>
              <li>- Give us feedbacks as much as possible</li>
            </ul>
          </Typography>
          <Typography variant="p" className="mt-2">
            In the same time, we will do our best to fix bugs and improve the
            project as fast as possible.
          </Typography>
          <div className="mt-4 flex justify-center">
            <Button asChild>
              <Link href={`/new/default`}>
                <CirclePlus className="mr-2 h-4 w-4 opacity-100" />
                Create Design System
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
