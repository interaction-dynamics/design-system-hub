import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function NewDesignSystemFigmaPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Detecting design system</CardTitle>
        <CardDescription>
          We are currently detecting your design system...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="p-10 flex items-center justify-center"></p>
      </CardContent>
    </Card>
  )
}
