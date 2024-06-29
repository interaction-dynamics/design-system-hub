import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { productName } from '@/config/names'
import { ConnectFigmaButton } from './_components/connect-figma-button'
import { SkipButton } from '../../_components/skip-button'

export default function NewDesignSystemFigmaPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Connect Figma</CardTitle>
        <CardDescription>
          In order to maintain your design system, {productName} needs to access
          some of your figma files. The first step is to connect your Figma
          account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="p-10 flex items-center justify-center">
          <ConnectFigmaButton />
        </p>
      </CardContent>
      <CardFooter>
        <SkipButton href="/design-system/new/repository/connect" />
      </CardFooter>
    </Card>
  )
}
