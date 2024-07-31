import { findDesignSystenToken } from '@/adapters/data-access/design-system-token'
import { findDesignSystemById } from '@/adapters/data-access/design-systems'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { notFound } from 'next/navigation'
import { getSyncCommand } from '../utils/get-commands'
import { CodeBlock } from '@/components/atoms/code-block'
import { LoadingButton } from '@/components/atoms/loading-button'
import { GenerateToken } from './generate-token'

interface Props {
  designSystemId: string
}

export async function CodeSettings({ designSystemId }: Props) {
  const designSystem = await findDesignSystemById(designSystemId)

  if (!designSystem) notFound()

  const designSystemToken = await findDesignSystenToken(designSystemId)

  if (!designSystemToken) notFound()

  const command = getSyncCommand(designSystemToken?.token ?? '')

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Synchronization</CardTitle>
          <CardDescription>
            Force synchronizing the design system from the code. The
            synchronization is not automatic yet but it will come soon.
          </CardDescription>
        </CardHeader>
        <GenerateToken designSystemId={designSystem.id} />
      </Card>
    </div>
  )
}
