export interface Property {
  name: string
  type: string
  description: string
  defaultValue: string | undefined
  deprecated?: boolean
  optional?: boolean
}
