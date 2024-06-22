import { Style } from '@/domain/entities/style'

export interface FigmaStyleProvider {
  description: string
  key: string
  fileKey: string
  nodeId: string
  thumbnailUrl: string
}

export type FigmaStyle = Style<{ figma: FigmaStyleProvider }>
