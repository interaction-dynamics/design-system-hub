import { Property } from './property'
import { ComponentVariant, ComponentProviders } from './component-variant'

export interface Component<T = any> {
  id: string
  name: string
  slug: string
  properties: Property[]
  variants: ComponentVariant<T>[]
  providers: ComponentProviders<T>
}
