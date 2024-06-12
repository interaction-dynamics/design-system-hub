import { HttpFigmaComponent } from './fetchFigmaComponent'
import generateSlug from '@/lib/generate-slug'
import { FigmaComponent } from '../../types/figma-component'
import { PartialHttpFigmaComponent } from './parseFigmaFiles'

export default function parseFigmaComponent(
  figmaComponent: HttpFigmaComponent,
  partialComponent: Omit<PartialHttpFigmaComponent, 'variants'>
): FigmaComponent {
  return {
    id: '',
    name: figmaComponent.name,
    slug: generateSlug(figmaComponent.name),
    variants: [],
    properties: [],
    providers: {
      figma: {
        description: figmaComponent.description,
        thumbnailUrl: figmaComponent.thumbnail_url,
        key: figmaComponent.key,
        nodeId: figmaComponent.node_id,
        fileKey: figmaComponent.file_key,
        width: partialComponent.providers.figma?.width ?? 0,
        height: partialComponent.providers.figma?.height ?? 0,
      },
    },
  }
}
