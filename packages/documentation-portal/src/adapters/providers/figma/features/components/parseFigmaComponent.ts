import { HttpFigmaComponent } from './fetchFigmaComponent'
import generateSlug from '@/lib/generate-slug'
import { PartialComponent } from '@/domain/entities/partial-component'
import { PartialComponentVariant } from '@/domain/entities/partial-component-variant'
import { Component } from '@/domain/entities/component'
import { FigmaComponent } from '../../types/figma-component'

export default function parseFigmaComponent(
  figmaComponent: HttpFigmaComponent,
  partialComponent: PartialComponent | PartialComponentVariant
): FigmaComponent {
  return {
    name: figmaComponent.name,
    slug: generateSlug(figmaComponent.name),
    variants: [],
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
