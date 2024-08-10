import type { Config } from 'tailwindcss'
import { AllDesignTokens, DesignToken } from '../entities/design-token'

function recursiveGenerateTailwindTheme(
  tokens: DesignToken,
  path: string = '',
) {
  return Object.entries(tokens)
    .filter(([key]) => key !== '$type')
    .reduce((acc, [key, value]) => {
      if (typeof value === 'string') {
        return ''
      }

      if ('$value' in value) {
        return {
          ...acc,
          [key]: `var(--${path ? `${path}-` : ''}${key})`,
        }
      }

      return {
        ...acc,
        [key]: recursiveGenerateTailwindTheme(
          value,
          `${path}${path ? '-' : ''}${key}`,
        ),
      }
    }, {})
}

export function generateTailwindTheme(
  tokens: AllDesignTokens,
): Config['theme'] {
  const tokensColors = tokens.colors ?? {}

  const colors = recursiveGenerateTailwindTheme(tokensColors)

  return {
    colors,
  }
}
