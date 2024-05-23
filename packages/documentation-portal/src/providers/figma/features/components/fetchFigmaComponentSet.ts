import fetchFigmaApi from '../../utils/fetchFigmaApi'

export interface FigmaComponent {
  key: string
  file_key: string
  node_id: string
  thumbnail_url: string
  name: string
  description: string
  updated_at: string
  created_at: string
}

export default async function fetchFigmaComponentSet(
  token: string,
  componentSetKey: string
): Promise<FigmaComponent> {
  const response = await fetchFigmaApi(
    token,
    `component_sets/${componentSetKey}`
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Figma component set with key ${componentSetKey}`
    )
  }

  const result = await response.json()

  return result.meta
}
