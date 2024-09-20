import { z } from 'zod'
import {
  FigmaPartialComponentProvider,
  FigmaPartialComponentProviderValidator,
} from './figma-partial-component-provider'

export interface FigmaComponentProvider extends FigmaPartialComponentProvider {
  thumbnailUrl: string
  description: string
}

export const FigmaComponentProviderValidator =
  FigmaPartialComponentProviderValidator.extend({
    thumbnailUrl: z.string(),
    description: z.string(),
  })

export function validateFigmaComponentProvider(
  provider: any
): provider is FigmaComponentProvider {
  return Boolean(FigmaComponentProviderValidator.parse(provider))
}
