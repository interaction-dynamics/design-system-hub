import { GetFileResult } from 'figma-api/lib/api-types'
import { FigmaComponent } from '../../types/figma-component'

export function parseFiles(figmaFiles: GetFileResult[]): {
  figmaComponents: FigmaComponent[]
} {
  if (figmaFiles.length === 1) {
    const figmaResponse = figmaFiles[0]

    const figmaCanvas = (figmaResponse.document.children ?? []).filter((s) =>
      authorizedChapterTitles.includes(s.name.toLowerCase())
    )

    // const pages = figmaCanvas
    //   .map((canvas) => {
    //     const pages = (canvas?.children ?? []).map((page) => ({
    //       title: page.name,
    //       slug: generateSlug(page.name),
    //     }))

    //     return pages
    //   })
    //   .flatMap((p) => p)

    const componentsNotInSet = Object.entries(figmaResponse.components ?? {})
      .filter(([nodeId, c]) => !c.componentSetId)
      ?.map(([nodeId, c]) => ({
        name: c.name,
        slug: generateSlug(c.name),
        variants: [],
        providers: {
          figma: {
            nodeId,
            fileKey: '',
            key: c.key,
            ...findSize(figmaResponse.document, nodeId),
          },
        },
      }))

    const componentSetsAndVariants = Object.entries(
      figmaResponse.componentSets ?? {}
    )?.map(([nodeId, componentSet]) => ({
      variants: Object.entries(figmaResponse.components ?? {})
        .filter(([variantNodeId, c]) => c.componentSetId === nodeId)
        .map(([variantNodeId, c]) => ({
          providers: {
            figma: {
              nodeId: variantNodeId,
              fileKey: '',
              key: c.key,
              ...findSize(figmaResponse.document, variantNodeId),
            },
          },
        })),
      providers: {
        figma: {
          nodeId,
          fileKey: '',
          key: componentSet.key,
          ...findSize(figmaResponse.document, nodeId),
        },
      },
    }))

    const figmaComponents: PartialHttpFigmaComponent[] = [
      ...componentsNotInSet,
      ...componentSetsAndVariants,
    ]

    return {
      designSystem: {
        id: 'foo',
        name: figmaResponse.name,
        slug: generateSlug(figmaResponse.name),
        providers: {},
      },
      pages: [],
      figmaComponents,
    }
  }

  return {
    designSystem: {
      id: '',
      name: '',
      slug: '',
      providers: {},
    },
    pages: [],
    figmaComponents: [],
  }
}
