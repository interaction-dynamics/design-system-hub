import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { HelpCircle, Info, TriangleAlert } from 'lucide-react'
import { useId, useState } from 'react'
import { PropertyEditorInput } from './PropertyEditorInput'
import { PropertyEditorReactNode } from './PropertyEditorReactNode'
import { PropertyEditorVoidFunction } from './PropertyEditorVoidFunction'
import { PropertyEditorOupsSorry } from './PropertyEditorOupsSorry'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export interface PropertyEditorProps<T> {
  name: string
  description?: string
  type: string
  value?: T
  defaultValue?: T
  onChange: (name: string, value: T) => void
  deprecated?: boolean
}

export interface PropertyEditorGenericProps<T> {
  name: string
  description?: string
  type: string
  value?: T
  defaultValue?: T
  onChange: (name: string, value: T) => void
  id: string
  deprecated?: boolean
}

const findComponent = (type: string) => {
  if (type.includes('() => void')) {
    return PropertyEditorVoidFunction
  }

  if (type === 'string' || type === 'number') {
    return PropertyEditorInput
  }

  if (type === 'React.ReactNode') {
    return PropertyEditorReactNode
  }

  if (type.includes) return PropertyEditorOupsSorry
}

export function PropertyEditor<T>(props: PropertyEditorProps<T>) {
  const { name, type, deprecated, description } = props

  const id = useId()
  const Component = findComponent(type)

  const [showDescription, setShowDescription] = useState(false)

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div className="flex items-center">
        <Label htmlFor={id} className="inline-flex items-center gap-2 flex-1">
          {name}
        </Label>
        <button
          className="flex items-center gap-2"
          onClick={() => setShowDescription(s => !s)}
        >
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
          {/* <HelpCircle size={16} /> */}
          <Info size={16} />
        </button>
      </div>
      {showDescription && (
        <div className="flex flex-col gap-2 items-start">
          <Badge variant="outline">{type}</Badge>
          {deprecated && <Badge>Deprecated</Badge>}
          <div className="text-muted-foreground text-sm">{description}</div>
        </div>
      )}
      <Component id={id} {...props} />
    </div>
  )
}
