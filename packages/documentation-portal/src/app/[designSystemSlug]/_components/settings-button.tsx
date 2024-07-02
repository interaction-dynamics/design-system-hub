import Link from 'next/link'
import { GearIcon } from '@radix-ui/react-icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Button } from '@/components/ui/button'
import { DesignSystem } from '@/domain/entities/design-system'

interface Props {
  designSystem: DesignSystem
}

export function SettingsButton({ designSystem }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" className="px-2" asChild>
            <Link href={`/${designSystem.slug}/settings`}>
              <GearIcon className="w-5 h-5" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Design System Settings</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
