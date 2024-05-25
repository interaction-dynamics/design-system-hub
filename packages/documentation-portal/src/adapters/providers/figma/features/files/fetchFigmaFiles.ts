import { fetchFigmaApi } from '../../utils/figma-api'

export interface DocumentNode {
  id: string
  name: string
  type: string
  children?: DocumentNode[]
  characters?: string
  absoluteBoundingBox?: {
    width: number
    height: number
  }
}

export interface HttpFigmaFile {
  document: DocumentNode
  name: string
  components: Record<
    string,
    { name: string; key: string; description: string; componentSetId?: string }
  >
  componentSets: Record<
    string,
    { name: string; key: string; description: string }
  >
}

export default async function fetchFigmaFiles(
  token: string,
  fileKeys: string[]
): Promise<HttpFigmaFile[]> {
  const promises = await Promise.allSettled(
    fileKeys.map((fileKey) =>
      fetchFigmaApi(token, `files/${fileKey}`).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch Figma file with key ${fileKey}`)
        }

        return response.json()
      })
    )
  )

  return promises
    .filter(
      (result): result is PromiseFulfilledResult<any> =>
        result.status === 'fulfilled'
    )
    .map((result) => result.value)
}
