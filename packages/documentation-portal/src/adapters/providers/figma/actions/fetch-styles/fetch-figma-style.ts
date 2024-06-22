import { fetchFigmaApi } from '../../utils/figma-api'

export interface HttpFigmaStyle {
  key: string
  file_key: string
  node_id: string
  style_type: string
  thumbnail_url: string
  name: string
  description: string
  updated_at: string
  created_at: string
}

export async function fetchFigmaStyle(fileId: string, figmaToken: string) {
  const response = await fetchFigmaApi(figmaToken, `files/${fileId}/styles`)

  if (!response.ok) {
    throw new Error(`Failed to fetch Figma styles for file ${fileId}`)
  }

  return (await response.json()).meta.styles as HttpFigmaStyle[]
}
