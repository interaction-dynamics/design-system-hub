import { z } from 'zod'

export interface FigmaPartialComponentProvider {
  key: string
  nodeId: string
  fileKey: string
  width: number
  height: number
}

export const FigmaPartialComponentProviderValidator = z.object({
  key: z.string(),
  nodeId: z.string(),
  fileKey: z.string(),
  width: z.number(),
  height: z.number(),
})

export function validateFigmaPartialComponentProvider(
  provider: any
): provider is FigmaPartialComponentProvider {
  return Boolean(FigmaPartialComponentProviderValidator.parse(provider))
}
