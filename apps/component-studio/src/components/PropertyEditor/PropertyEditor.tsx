import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { HelpCircle } from 'lucide-react'
import { useId } from 'react'
import { PropertyEditorInput } from './PropertyEditorInput'
import { PropertyEditorReactNode } from './PropertyEditorReactNode'
import { PropertyEditorVoidFunction } from './PropertyEditorVoidFunction'

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

  if (type.includes) return null
}

export function PropertyEditor<T>(props: PropertyEditorProps<T>) {
  const { name, type, deprecated } = props

  const id = useId()
  const Component = findComponent(type)

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div className="flex items-center">
        <Label htmlFor={id} className="inline-flex items-center gap-2 flex-1">
          {name}: <Badge variant="outline">{type}</Badge>
          {deprecated && <Badge>Deprecated</Badge>}
        </Label>
        <HelpCircle size={16} />
      </div>
      {Component ? (
        <Component id={id} {...props} />
      ) : (
        <div className="text-muted-foreground text-sm px-2">Oups sorry</div>
      )}
    </div>
  )
}
