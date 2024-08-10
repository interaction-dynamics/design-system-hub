import path from 'node:path'
import { findDesignTokens } from '../find-design-tokens'

describe('findDesignTokens', () => {
  it('should return empty object', async () => {
    const tokenPath = path.join(__dirname, '../__fixtures__/empty')

    const result = await findDesignTokens(tokenPath)

    expect(result).toEqual({})
  })

  it('should return tokens', async () => {
    const tokenPath = path.join(__dirname, '../__fixtures__/with-tokens')

    const result = await findDesignTokens(tokenPath)

    expect(result).toEqual({
      colors: {
        $type: 'color',
        primary: {
          '500': {
            $value: 'rgba(231, 30, 77, 1)',
          },
          '600': {
            $value: 'rgba(226, 26, 95, 1)',
          },
          '700': {
            $value: 'rgba(215, 4, 102, 1)',
          },
        },
        slate: {
          '500': {
            $value: 'rgba(55, 65, 81, 1)',
          },
          '900': {
            $value: 'rgba(29, 0, 7, 1)',
          },
        },
        white: {
          $value: 'rgba(255, 255, 255, 1)',
        },
      },
    })
  })
})
