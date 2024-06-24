import { DesignSystem } from '@/domain/entities/design-system'
import { DocumentNode, HttpFigmaFile } from './fetchFigmaFiles'
import generateSlug from '@/lib/generate-slug'
import { FigmaPartialComponentProvider } from '../../types/figma-partial-component-provider'
import { Page } from '@/domain/entities/page'

const authorizedChapterTitles = ['Principles', 'Foundations'].map((s) =>
  s.toLowerCase()
)

const findNode = (
  node: DocumentNode,
  nodeId: string
): DocumentNode | undefined => {
  if (node.id === nodeId) {
    return node
  }

  for (const child of node.children ?? []) {
    const foundNode = findNode(child, nodeId)
    if (foundNode) {
      return foundNode
    }
  }

  return undefined
}

function findSize(
  rootNode: DocumentNode,
  nodeId: string
): { width: number; height: number } {
  const foundNode = findNode(rootNode, nodeId)

  return {
    width: foundNode?.absoluteBoundingBox?.width ?? 0,
    height: foundNode?.absoluteBoundingBox?.height ?? 0,
  }
}

export interface PartialHttpFigmaComponent {
  providers: {
    figma: FigmaPartialComponentProvider
  }
  variants: { providers: { figma: FigmaPartialComponentProvider } }[]
}

export default function parseFigmaFiles(figmaFiles: HttpFigmaFile[]): {
  designSystem: DesignSystem
  pages: Page[]
  figmaComponents: PartialHttpFigmaComponent[]
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
