import { DesignSystem } from '@/domain/entities/design-system'
import { Chapter } from '@/domain/entities/chapter'
import { DocumentNode, HttpFigmaFile } from './fetchFigmaFiles'
import { PartialPage } from '@/domain/entities/partial-page'
import { PartialComponent } from '@/domain/entities/partial-component'
import generateSlug from '@/lib/generate-slug'

const authorizedChapterTitles = ['Principles', 'Foundations'].map((s) =>
  s.toLowerCase()
)

const byName = (a: PartialComponent, b: PartialComponent) =>
  a.name.localeCompare(b.name)

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

export default function parseFigmaFiles(
  figmaFiles: HttpFigmaFile[]
): DesignSystem {
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
            key: c.key,
            ...findSize(figmaResponse.document, nodeId),
          },
        },
      }))

    const componentSetsAndVariants = Object.entries(
      figmaResponse.componentSets ?? {}
    )?.map(([nodeId, componentSet]) => ({
      name: componentSet.name,
      slug: generateSlug(componentSet.name),
      variants: Object.entries(figmaResponse.components ?? {})
        .filter(([variantNodeId, c]) => c.componentSetId === nodeId)
        .map(([variantNodeId, c]) => ({
          providers: {
            figma: {
              key: c.key,
              ...findSize(figmaResponse.document, variantNodeId),
            },
          },
        })),
      providers: {
        figma: {
          key: componentSet.key,
          ...findSize(figmaResponse.document, nodeId),
        },
      },
    }))

    const components: PartialComponent[] = [
      ...componentsNotInSet,
      ...componentSetsAndVariants,
    ].sort(byName)

    return new DesignSystem(
      figmaResponse.name,
      generateSlug(figmaResponse.name),
      chapters,
      components
    )
  }

  return new DesignSystem('', '', [], [])
}
