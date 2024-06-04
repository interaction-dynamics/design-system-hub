import { Property } from './Property'

export interface Component {
  name: string
  path: string
  description: string
  properties: Property[]
}
