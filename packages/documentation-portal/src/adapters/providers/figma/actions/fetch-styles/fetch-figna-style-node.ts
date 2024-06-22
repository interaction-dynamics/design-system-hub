import * as Figma from 'figma-api'

import { fetchFigmaApi } from '../../utils/figma-api'

export async function fetchFigmaStyleNodes(
  figmaToken: string,
  fileKey: string,
  nodeIds: string[]
) {
  const api = new Figma.Api({ personalAccessToken: figmaToken })

  const response = await api.getFileNodes(fileKey, nodeIds)

  return response.
}
