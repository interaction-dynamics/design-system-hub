import path from 'node:path'
import { generateTailwindTheme } from './actions/generate-tailwind-theme'
import { findDesignTokens } from './actions/find-design-tokens'

export function generateTailwindConfig(folderName: string = '.tokens') {
  const tokenPath = path.join(process.cwd(), folderName)

  return findDesignTokens(tokenPath).then(generateTailwindTheme)
}
