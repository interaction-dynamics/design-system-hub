import { z } from 'zod'

import { Property } from './property'
import { PartialComponent } from './partial-component'
import { ComponentVariant } from './component-variant'

export interface Component<T = any> extends PartialComponent<T> {
  properties?: Property[]
  variants: ComponentVariant[]
}
