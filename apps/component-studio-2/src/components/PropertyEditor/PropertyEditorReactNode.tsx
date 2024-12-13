import { Input } from '@/components/ui/input'
import type { PropertyEditorGenericProps } from './PropertyEditor'

export interface PropertyEditorReactNodeProps
  extends PropertyEditorGenericProps<string> {}

export function PropertyEditorReactNode({
  name,
  value,
  defaultValue,
  onChange,
  id,
}: PropertyEditorReactNodeProps) {
  return (
    <Input
      id={id}
      type="text"
      {...(defaultValue === undefined
        ? {}
        : { placeholder: `${defaultValue}` })}
      value={value}
      onChange={event => {
        onChange(name, event.target.value)
      }}
    />
  )
}
