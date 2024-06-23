import { z } from 'zod'

import { Style } from '@/domain/entities/style'

export interface FigmaStyleProvider {
  description: string
  key: string
  fileKey: string
  nodeId: string
  thumbnailUrl: string
  width: number
  height: number
}

export type FigmaStyle = Style<{ figma: FigmaStyleProvider }>

export const FigmaStyleValidator = z.object({
  providers: z.object({
    figma: z.object({
      description: z.string(),
      key: z.string(),
      fileKey: z.string(),
      nodeId: z.string(),
      thumbnailUrl: z.string(),
      width: z.number(),
      height: z.number(),
    }),
  }),
})

export function validateFigmaStyle(style: Style): style is FigmaStyle {
  return Boolean(FigmaStyleValidator.safeParse(style))
}
