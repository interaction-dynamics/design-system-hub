import Component from '@/features/component/types/Component'
import { FigmaComponent } from './fetchFigmaComponent'
import generateSlug from '@/lib/generate-slug'
import PartialComponent, {
  PartialComponentVariant,
} from '@/features/component/types/PartialComponent'

export default function parseFigmaComponent(
  figmaComponent: FigmaComponent,
  partialComponent: PartialComponent | PartialComponentVariant
): Component {
  return {
    name: figmaComponent.name,
    slug: generateSlug(figmaComponent.name),
    description: {
      figma: figmaComponent.description,
    },
    variants: [],
    thumbnailUrl: {
      figma: figmaComponent.thumbnail_url,
    },
    origin: {
      figma: {
        key: figmaComponent.key,
        nodeId: figmaComponent.node_id,
        fileKey: figmaComponent.file_key,
        width: partialComponent.origin.figma?.width ?? 0,
        height: partialComponent.origin.figma?.height ?? 0,
      },
    },
  }
}
