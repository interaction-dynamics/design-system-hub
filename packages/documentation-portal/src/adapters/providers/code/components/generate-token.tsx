'use client'

import { CodeBlock } from '@/components/atoms/code-block'
import { LoadingButton } from '@/components/atoms/loading-button'
import { CardFooter } from '@/components/ui/card'
import { DesignSystem } from '@/domain/entities/design-system'
import useSWRMutation from 'swr/mutation'
import { getSyncCommand } from '../utils/get-commands'
import Typography from '@/components/atoms/typography'

async function createDesignSystemToken(
  url: string,
  { arg }: { arg: { designSystemId: string } }
) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((r) => r.json())
}

interface Props {
  designSystemId: string
}

export function GenerateToken({ designSystemId }: Props) {
  const { trigger, isMutating, data } = useSWRMutation(
    '/api/design-system-token',
    createDesignSystemToken
  )

  const onClick = () => trigger({ designSystemId })

  const command = data?.token ? getSyncCommand(data?.token) : ''

  return (
    <CardFooter className="border-t py-3 flex justify-end">
      {command ? (
        <div className="w-full">
          <Typography variant="p" className="mb-2">
            Use this command in your terminal:
          </Typography>
          <CodeBlock language="bash">{command}</CodeBlock>
          <Typography variant="p" className="mt-2">
            This command won&apos;t be visible again, please save it.
          </Typography>
        </div>
      ) : (
        <LoadingButton onClick={onClick} loading={isMutating}>
          Generate new token
        </LoadingButton>
      )}
    </CardFooter>
  )
}
