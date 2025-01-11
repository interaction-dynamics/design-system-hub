'use client'

import { useId, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { HelpCircle, Info, TriangleAlert } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { findPropertyEditor } from './utils/find-property-editor'

export interface PropertyEditorProps {
  type: string
  deprecated?: boolean
  name: string
  defaultValue: any
  value: any
  description: string
  onChange: (name: string, value: any) => void
}

export function PropertyEditor(props: PropertyEditorProps) {
  const { name, type, deprecated, description } = props

  const id = useId()
  const PropertyEditorComponent = findPropertyEditor(type, name)

  const [showDescription, setShowDescription] = useState(false)

  return (
    <div className='grid w-full items-center gap-1.5 p-2'>
      <div className='flex items-center'>
        <Label htmlFor={id} className='inline-flex items-center gap-2 flex-1'>
          {name}
        </Label>

        <div className='flex items-center gap-2'>
          {deprecated && (
            <Tooltip>
              <TooltipTrigger>
                <TriangleAlert size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Deprecated</p>
              </TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger onClick={() => setShowDescription(s => !s)}>
              <Info size={16} />
            </TooltipTrigger>
            <TooltipContent>More details</TooltipContent>
          </Tooltip>
        </div>
      </div>
      {showDescription && (
        <div className='flex flex-col gap-2 items-start'>
          <Badge variant='outline'>{type}</Badge>
          {deprecated && <Badge>Deprecated</Badge>}
          <div className='text-muted-foreground text-sm'>{description}</div>
        </div>
      )}
      <PropertyEditorComponent id={id} {...props} />
    </div>
  )
}
