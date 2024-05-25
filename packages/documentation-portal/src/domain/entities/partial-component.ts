import {
  PartialComponentProviders,
  PartialComponentVariant,
} from './partial-component-variant'

export interface PartialComponent<T = any> {
  name: string
  slug: string
  providers: PartialComponentProviders<T>
  variants: PartialComponentVariant[]
}
