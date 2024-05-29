import { Component } from '@/domain/entities/component'
import parseFigmaComponent from './parseFigmaComponent'
import { PartialComponent } from '@/domain/entities/partial-component'
import { HttpFigmaComponent } from './fetchFigmaComponent'
import { PartialHttpFigmaComponent } from './parseFigmaFiles'
import generateSlug from '@/lib/generate-slug'

const cleanVariantName = (name: string) => name.replace(/.*=/, '')

export default function parseFigmaComponentSet(
  figmaComponent: HttpFigmaComponent,
  variants: HttpFigmaComponent[],
  partialComponent: PartialHttpFigmaComponent
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
        slug: generateSlug(cleanVariantName(variant.name)),
      })),
  }
}
