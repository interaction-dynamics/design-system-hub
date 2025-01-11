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
