import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { productName } from '@/config/names'
import { SkipButton } from '../../../../_components/skip-button'
import { notFound } from 'next/navigation'
import { CodeBlock } from '@/components/atoms/code-block'
import { generateDesignSystemToken } from '@/domain/use-cases/design-system-token'
import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { createDesignSystemToken } from '@/adapters/data-access/design-system-token'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
  params: { designSystemSlug: string; organizationSlug: string }
}

export default async function NewDesignSystemFigmaPage({ params }: Props) {
  const designSystem = await findDesignSystemBySlug(params.designSystemSlug)

  if (!designSystem) notFound()

  const designSystemToken = await generateDesignSystemToken(
    { designSystemId: designSystem.id },
    { createDesignSystemToken }
  )

  const command = `npx dshub sync --token ${designSystemToken} --cwd <designSystemPath>`

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
        <p>
          Run the following command in your terminal to extract the components.
        </p>
        <div className="pt-4 pb-4">
          <CodeBlock language="bash">{command}</CodeBlock>
        </div>
        <div className="text-sm text-muted-foreground">
          Please keep in mind that we won&apos;t show your token again. Make
          sure to save it in a safe place to rerun the command in the future.
        </div>
        <div className="flex justify-end mt-5">
          <Button asChild>
            <Link
              href={`/new/${params.organizationSlug}/repository/${params.designSystemSlug}/search`}
            >
              I did it
            </Link>
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <SkipButton
          href={`/new/${params.organizationSlug}/setup/${params.designSystemSlug}`}
        />
      </CardFooter>
    </Card>
  )
}
