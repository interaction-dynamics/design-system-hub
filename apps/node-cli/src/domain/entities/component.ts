import { Property } from './property'

export interface Component {
  name: string
  path: string
  description: string
  properties: Property[]
  deprecated?: boolean
}
