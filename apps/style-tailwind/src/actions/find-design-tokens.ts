import fs from 'node:fs'
import { AllDesignTokens } from '../entities/design-token'
import path from 'node:path'

export function findDesignTokens(tokenPath: string): AllDesignTokens {
  const files = fs.readdirSync(tokenPath)

  const contents = files
    .filter(f => f.startsWith('colors'))
    .filter(f => f.endsWith('.json'))
    .map(file => ({
      name: file.replace('.json', ''),
      content: JSON.parse(fs.readFileSync(path.join(tokenPath, file), 'utf-8')),
    }))

  return contents.reduce((acc, { name, content }) => {
    return {
      ...acc,
      [name]: content,
    }
  }, {})
}
