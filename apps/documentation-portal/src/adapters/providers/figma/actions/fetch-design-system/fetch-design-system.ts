import { Component } from '@/domain/entities/component'
import fetchFigmaComponent from './fetchFigmaComponent'
import fetchFigmaComponentSet from './fetchFigmaComponentSet'
import parseFigmaComponent from './parseFigmaComponent'
import parseFigmaComponentSet from './parseFigmaComponentSet'
import fetchFigmaFiles from './fetchFigmaFiles'
import parseFigmaFiles, { PartialHttpFigmaComponent } from './parseFigmaFiles'

async function fetchComponent(partialComponent: PartialHttpFigmaComponent) {
  if (partialComponent.variants.length > 0) {
    const figmaComponentSet = await fetchFigmaComponentSet(
      process.env.FIGMA_TOKEN ?? '',
      partialComponent.providers.figma?.key ?? ''
    )

    const figmaVariants = await Promise.all(
      partialComponent.variants.map((v) =>
        fetchFigmaComponent(
          process.env.FIGMA_TOKEN ?? '',
          v.providers.figma?.key ?? ''
        )
      )
    )

    const component = parseFigmaComponentSet(
      figmaComponentSet,
      figmaVariants,
      partialComponent
    )

    return component
  }

  const figmaComponent = await fetchFigmaComponent(
    process.env.FIGMA_TOKEN ?? '',
    partialComponent.providers.figma?.key ?? ''
  )

  return parseFigmaComponent(figmaComponent, partialComponent)
}

const byName = (a: Component, b: Component) => a.name.localeCompare(b.name)

export async function fetchDesignSystem(fileIds: string[]) {
  const figmaFiles = await fetchFigmaFiles(
    process.env.FIGMA_TOKEN ?? '',
    fileIds
  )

  const { designSystem, figmaComponents, pages } = parseFigmaFiles(figmaFiles)

  const unsortedComponents = await Promise.all(
    figmaComponents.map((p) => fetchComponent(p))
  )

  const components = unsortedComponents.slice().sort(byName)

  return {
    designSystem,
    components,
    pages,
  }
}
