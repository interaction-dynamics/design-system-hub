import { Property } from './property'
import { PartialComponent } from './partial-component'
import { ComponentVariant, ComponentProviders } from './component-variant'

export interface Component<T = any> {
  name: string
  slug: string
  properties: Property[]
  variants: ComponentVariant<T>[]
  providers: ComponentProviders<T>
}