import { DesignSystem } from '@/domain/entities/design-system'
import { Chapter } from '@/domain/entities/chapter'
import { DocumentNode, HttpFigmaFile } from './fetchFigmaFiles'
import { PartialPage } from '@/domain/entities/partial-page'
import generateSlug from '@/lib/generate-slug'
import { FigmaPartialComponentProvider } from '../../types/figma-partial-component-provider'

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
  chapters: Chapter[]
  figmaComponents: PartialHttpFigmaComponent[]
} {
  if (figmaFiles.length === 1) {
    const figmaResponse = figmaFiles[0]

    const figmaCanvas = (figmaResponse.document.children ?? []).filter((s) =>
      authorizedChapterTitles.includes(s.name.toLowerCase())
    )

    const chapters = figmaCanvas.map((canvas): Chapter => {
      const pages = (canvas?.children ?? []).map(
        (page): PartialPage => ({
          title: page.name,
          slug: generateSlug(page.name),
        })
      )

      return {
        type: canvas.name.toLowerCase() as Chapter['type'],
        pages: pages,
      }
    })

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
      chapters,
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
    chapters: [],
    figmaComponents: [],
  }
}
