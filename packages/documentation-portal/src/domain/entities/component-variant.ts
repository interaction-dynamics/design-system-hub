import { PartialComponentVariant } from './partial-component-variant'

export interface ComponentVariant<T = any> extends PartialComponentVariant<T> {
  name: string
  slug: string
}
