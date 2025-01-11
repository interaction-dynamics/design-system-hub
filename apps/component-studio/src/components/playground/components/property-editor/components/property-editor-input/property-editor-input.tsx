import { Input } from '@/components/ui/input'
import type { PropertyEditorGenericProps } from '../property-editor-generic'

export interface PropertyEditorInputProps
  extends PropertyEditorGenericProps<string | number> {}

const types = {
  string: 'text',
  number: 'number',
} as const

const convertType = (type: string, value: string | number) => {
  if (type === 'number' && typeof value === 'string') {
    return parseFloat(value)
  }

  return value
}

export function PropertyEditorInput({
  name,
  defaultValue,
  onChange,
  type,
  id,
  value,
}: PropertyEditorInputProps) {
  if (type !== 'number' && type !== 'string') {
    return <></>
  }

  return (
    <Input
      id={id}
      type={types[type] ?? 'text'}
      {...(defaultValue === undefined
        ? {}
        : { placeholder: `${defaultValue}` })}
      value={value}
      onChange={event => {
        const value = event.target.value
        onChange(name, convertType(type, value))
      }}
    />
  )
}
