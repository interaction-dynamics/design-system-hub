import { Style } from '@/domain/entities/style'
import { generateDesignTokens } from '../design-token'
import {
  mockColorStyle,
  mockElevationStyle,
  mockTypographyStyle,
} from '@/domain/entities/__mocks__/mockStyle'

describe('generateDesignTokens', () => {
  it('should generate empty objects', () => {
    const styles: Style[] = []

    const result = generateDesignTokens({ styles })

    expect(result).toEqual({
      colors: {
        $type: 'color',
      },
      dimensions: {},
      text: {
        typography: {
          $type: 'typography',
        },
      },
      'object-values': {
        shadows: {
          $type: 'shadow',
        },
      },
    })
  })

  it('should generate basic color', () => {
    const styles: Style[] = [
      mockColorStyle({ name: 'white', metadata: { color: '#ffffff' } }),
    ]

    const result = generateDesignTokens({ styles })

    expect(result).toEqual({
      colors: {
        $type: 'color',
        white: {
          $value: '#ffffff',
        },
      },
      dimensions: {},
      text: {
        typography: {
          $type: 'typography',
        },
      },
      'object-values': {
        shadows: {
          $type: 'shadow',
        },
      },
    })
  })

  it('should generate grouped color coming from Figma styles', () => {
    const styles: Style[] = [
      mockColorStyle({ name: 'slate/300', metadata: { color: '#ff1122' } }),
      mockColorStyle({ name: 'slate/900', metadata: { color: '#ff1100' } }),
    ]

    const result = generateDesignTokens({ styles })

    expect(result).toEqual({
      colors: {
        $type: 'color',
        slate: {
          300: {
            $value: '#ff1122',
          },
          900: {
            $value: '#ff1100',
          },
        },
      },
      dimensions: {},
      text: {
        typography: {
          $type: 'typography',
        },
      },
      'object-values': {
        shadows: {
          $type: 'shadow',
        },
      },
    })
  })

  it('should generate shadows', () => {
    const styles: Style[] = [
      mockElevationStyle({ name: 'raised', metadata: { color: '#ff1122' } }),
      mockElevationStyle({ name: 'overlay', metadata: { color: '#ff1100' } }),
    ]

    const result = generateDesignTokens({ styles })

    expect(result).toEqual({
      colors: {
        $type: 'color',
      },
      dimensions: {},
      text: {
        typography: {
          $type: 'typography',
        },
      },
      'object-values': {
        shadows: {
          $type: 'shadow',
          overlay: {
            $value: {
              blur: 3,
              color: '#ff1100',
              offsetX: 1,
              offsetY: 2,
            },
          },
          raised: {
            $value: {
              blur: 3,
              color: '#ff1122',
              offsetX: 1,
              offsetY: 2,
            },
          },
        },
      },
    })
  })

  it('should generate typographies', () => {
    const styles: Style[] = [
      mockTypographyStyle({
        name: 'h1',
        metadata: {
          fontFamily: 'Geist',
          fontSize: 39,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: 0,
        },
      }),
      mockTypographyStyle({
        name: 'h2',
        metadata: {
          fontFamily: 'Geist',
          fontSize: 30,
          fontWeight: 600,
          lineHeight: 1,
          letterSpacing: 0,
        },
      }),
    ]

    const result = generateDesignTokens({ styles })

    expect(result).toEqual({
      colors: {
        $type: 'color',
      },
      dimensions: {},
      text: {
        typography: {
          $type: 'typography',
          h1: {
            $value: {
              fontFamily: 'Geist',
              fontSize: 39,
              fontWeight: 700,
              letterSpacing: 0,
              lineHeight: 1,
            },
          },
          h2: {
            $value: {
              fontFamily: 'Geist',
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: 0,
              lineHeight: 1,
            },
          },
        },
      },
      'object-values': {
        shadows: {
          $type: 'shadow',
        },
      },
    })
  })
})
