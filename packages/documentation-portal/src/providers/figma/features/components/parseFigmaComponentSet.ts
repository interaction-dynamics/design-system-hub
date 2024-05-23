import Component from '@/features/component/types/Component'
import { FigmaComponent } from './fetchFigmaComponent'
import parseFigmaComponent from './parseFigmaComponent'
import PartialComponent from '@/features/component/types/PartialComponent'

const cleanVariantName = (name: string) => name.replace(/.*=/, '')

export default function parseFigmaComponentSet(
  figmaComponent: FigmaComponent,
  variants: FigmaComponent[],
  partialComponent: PartialComponent
): Component {
  return {
    ...parseFigmaComponent(figmaComponent, partialComponent),
    variants: variants
      .map((v, index) =>
        parseFigmaComponent(v, partialComponent.variants[index])
      )
      .map((variant) => ({
        ...variant,
        name: cleanVariantName(variant.name),
      })),
  }
}
