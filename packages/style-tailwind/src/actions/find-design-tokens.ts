import fs from 'node:fs/promises'
import { AllDesignTokens } from '../entities/design-token'
import path from 'node:path'

export async function findDesignTokens(
  tokenPath: string,
): Promise<AllDesignTokens> {
  const files = await fs.readdir(tokenPath)

  const promises = files
    .filter(f => f.startsWith('colors'))
    .filter(f => f.endsWith('.json'))
    .map(async file => ({
      name: file.replace('.json', ''),
      content: JSON.parse(
        await fs.readFile(path.join(tokenPath, file), 'utf-8'),
      ),
    }))

  const contents = await Promise.all(promises)

  return contents.reduce((acc, { name, content }) => {
    return {
      ...acc,
      [name]: content,
    }
  }, {})
}
