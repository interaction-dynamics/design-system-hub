import { Property } from './property'

export interface Component {
  name: string
  path: string
  description: string
  deprecated?: boolean
  properties: Property[]
}
