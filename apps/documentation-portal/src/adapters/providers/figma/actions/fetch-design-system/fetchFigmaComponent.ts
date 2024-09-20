import { fetchFigmaApi } from '../../utils/figma-api'

export interface HttpFigmaComponent {
  key: string
  file_key: string
  node_id: string
  thumbnail_url: string
  name: string
  description: string
  updated_at: string
  created_at: string
}

export default async function fetchFigmaComponent(
  token: string,
  componentKey: string
): Promise<HttpFigmaComponent> {
  const response = await fetchFigmaApi(token, `components/${componentKey}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch Figma component with key ${componentKey}`)
  }

  const result = await response.json()

  return result.meta
}
