'use client'

import useSWRMutation from 'swr/mutation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoadingButton } from '@/components/atoms/loading-button'
import { FetchIndicator } from '@/components/organisms/fetch-indicator'
import { Accordion } from '@/components/ui/accordion'

async function syncFigmaDesignSystem(url: string) {
  return fetch(url, {
    method: 'POST',
  }).then((r) => r.json())
}

interface Props {
  designSystemId: string
}

export function FigmaSettings({ designSystemId }: { designSystemId: string }) {
  const { trigger, isMutating, data } = useSWRMutation(
    `/api/figma/sync/${designSystemId}`,
    syncFigmaDesignSystem
  )

  return (
    <div>
      <Card>
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>Synchronization</CardTitle>
            <CardDescription>
              Force synchronizing the design system from Figma. The
              synchronization is not automatic yet but it will come soon.
            </CardDescription>
          </CardHeader>
          <CardHeader>
            <LoadingButton
              variant="default"
              onClick={() => trigger()}
              loading={isMutating}
            >
              Sync
            </LoadingButton>
          </CardHeader>
        </div>
        {data && (
          <CardFooter className="border-t">
            <Accordion type="single" collapsible>
              <FetchIndicator
                title={`${data.components.length} components found`}
                details={data.components.map((c) => c.name)}
              />
              <FetchIndicator
                title={`${data.styles.length} styles found`}
                details={data.styles.map((c) => c.name)}
              />
            </Accordion>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
