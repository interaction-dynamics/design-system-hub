import * as Figma from 'figma-api'

import { FigmaStyle } from '../../types/figma-style'
import { parseFigmaStyle } from './parse-figma-style'

async function fetchStyleFromOneFile(
  fileKey: string,
  figmaToken: string
): Promise<FigmaStyle[]> {
  const api = new Figma.Api({ personalAccessToken: figmaToken })

  const figmaStyles = (await api.getFileStyles(fileKey)).meta?.styles ?? []

  const nodeIds = figmaStyles.map((style) => style.node_id)

  const nodesById = (await api.getFileNodes(fileKey, nodeIds)).nodes

  return await Promise.all(
    figmaStyles.map((s) => parseFigmaStyle(s, nodesById as any))
  )
}

export async function fetchStyles(
  fileIds: string[],
  figmaToken: string
): Promise<FigmaStyle[]> {
  const promises = fileIds.map((fileId) =>
    fetchStyleFromOneFile(fileId, figmaToken)
  )

  return (await Promise.all(promises)).flatMap((p) => p)
}
