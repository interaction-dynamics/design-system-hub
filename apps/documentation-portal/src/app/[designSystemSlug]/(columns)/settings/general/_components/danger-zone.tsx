'use client'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DesignSystem } from '@/domain/entities/design-system'
import { Spinner } from '@/components/atoms/spinner'
import { useRouter } from 'next/navigation'

interface Props {
  designSystem: DesignSystem
}

async function deleteDesignSystem(url: string) {
  return fetch(url, { method: 'DELETE' })
}

export function DangerZone({ designSystem }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { trigger, isMutating } = useSWRMutation(
    `/api/design-system/${designSystem.id}`,
    deleteDesignSystem
  )

  const router = useRouter()

  const onDeleteDesignSystem = async () => {
    await trigger()
    setIsDialogOpen(false)
    router.push('/dashboard')
  }

  return (
    <Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {designSystem.name}</DialogTitle>
            <DialogDescription className="py-4">
              This action cannot be undone. This will permanently delete your
              design system and remove your data from our servers.
            </DialogDescription>
            <DialogFooter>
              <Button
                className="w-full"
                variant="destructive"
                disabled={isMutating}
                onClick={onDeleteDesignSystem}
              >
                {isMutating && (
                  <Spinner className="animate-spin h-5 w-5 -ml-1 mr-2" />
                )}
                I want to delete this design system
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Delete this design system</CardTitle>
          <CardDescription>
            Once you delete a design system, there is no going back. Please be
            certain.
          </CardDescription>
        </CardHeader>
        <CardHeader>
          <Button variant="destructive" onClick={() => setIsDialogOpen(true)}>
            Delete
          </Button>
        </CardHeader>
      </div>
    </Card>
  )
}
