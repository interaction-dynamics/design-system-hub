import { Property } from './property2'

export interface Component {
  name: string
  path: string
  description: string
  properties: Property[]
}
