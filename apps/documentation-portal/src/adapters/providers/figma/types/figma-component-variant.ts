import { FigmaComponentProvider } from './figma-component-provider'
import { ComponentVariant } from '@/domain/entities/component-variant'

export interface FigmaComponentVariant
  extends ComponentVariant<FigmaComponentProvider> {
  providers: {
    figma: FigmaComponentProvider
  }
}
