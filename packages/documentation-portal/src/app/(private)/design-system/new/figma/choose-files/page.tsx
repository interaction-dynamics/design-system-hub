import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SkipButton } from '../../_components/skip-button'

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Select Figma files</CardTitle>
        <CardDescription>
          Select the files containing the design system. We will extract only
          the published styles and components from these files.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="p-10 flex items-center justify-center"></p>
      </CardContent>
      <CardFooter>
        <SkipButton href="/design-system/new/repository/connect" />
      </CardFooter>
    </Card>
  )
}
