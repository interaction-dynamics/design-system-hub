import { z } from 'zod'

import { Component } from '@/domain/entities/component'
import {
  FigmaComponentProvider,
  FigmaComponentProviderValidator,
} from './figma-component-provider'
import { ComponentVariant } from '@/domain/entities/component-variant'

export interface FigmaComponent extends Component<FigmaComponentProvider> {
  providers: {
    figma: FigmaComponentProvider
  }
}

export const FigmaComponentValidator = z.object({
  providers: z.object({
    figma: FigmaComponentProviderValidator,
  }),
})

export function validateFigmaComponent(
  component: Component | ComponentVariant
): component is FigmaComponent {
  return Boolean(FigmaComponentValidator.safeParse(component))
}
