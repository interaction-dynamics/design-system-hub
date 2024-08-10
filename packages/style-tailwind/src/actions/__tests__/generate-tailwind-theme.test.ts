import { generateTailwindTheme } from '../generate-tailwind-theme'

describe('generateTailwindTheme', () => {
  it('should return empty config', () => {
    const tokens = {}

    const result = generateTailwindTheme(tokens)

    expect(result).toEqual({
      colors: {},
    })
  })

  it('should return config with primary', () => {
    const tokens = {
      colors: {
        $type: 'color',
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
    }

    const result = generateTailwindTheme(tokens)

    expect(result).toEqual({
      colors: {
        slate: {
          500: 'var(--slate-500)',
          900: 'var(--slate-900)',
        },
        white: 'var(--white)',
      },
    })
  })
})
