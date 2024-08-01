import path from 'node:path'
import { extractDesignSystem } from '../extract-design-system'
import { DesignSystem } from '../../domain/entities/design-system'

describe('extractDesignSystem', () => {
  describe('empty design system', () => {
    const dirPath = path.join(__dirname, '../../../../../examples/empty/src')

    it('should return url', async () => {
      const expectedUrl =
        /(git@github.com:interaction-dynamics\/design-system-hub.git)|(https:\/\/github.com\/interaction-dynamics\/design-system-hub)/

      const designSystem = await extractDesignSystem(dirPath)

      expect(designSystem.provider.url).toMatch(expectedUrl)
    })

    it('should return relative path src', async () => {
      const designSystem = await extractDesignSystem(dirPath)

      expect(designSystem.provider.relativePath).toEqual('examples/empty/src')
    })

    it('should return no components', async () => {
      const designSystem = await extractDesignSystem(dirPath)

      expect(designSystem.components).toEqual([])
    })
  })

  describe('zero config', () => {
    const dirPath = path.join(
      __dirname,
      '../../../../../examples/zero-config/src/libs',
    )

    it('should return url', async () => {
      const expectedUrl =
        /(git@github.com:interaction-dynamics\/design-system-hub.git)|(https:\/\/github.com\/interaction-dynamics\/design-system-hub)/

      const designSystem = await extractDesignSystem(dirPath)

      expect(designSystem.provider.url).toMatch(expectedUrl)
    })

    it('should return relative path src', async () => {
      const designSystem = await extractDesignSystem(dirPath)

      expect(designSystem.provider.relativePath).toEqual(
        'examples/zero-config/src/libs',
      )
    })

    describe('components', () => {
      it('should return 5 component', async () => {
        const designSystem = await extractDesignSystem(dirPath)

        expect(designSystem.components).toHaveLength(5)
      })

      describe('LegacyButton', () => {
        const getComponent = (designSystem: DesignSystem) =>
          designSystem.components[0]

        it('should return component with name Button', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).name).toEqual('ButtonLegacy')
        })

        it('should return component with path atoms/button.tsx', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).path).toEqual(
            'atoms/button-legacy.tsx',
          )
        })

        it('should return component with description', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).description).toEqual(
            'A Button component',
          )
        })

        it('should return component deprecated', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).deprecated).toEqual(true)
        })

        it('should return component with 3 properties', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties).toHaveLength(3)
        })

        it('should return component with properties children', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[0]).toEqual({
            name: 'children',
            type: 'React.ReactNode',
            description: 'The content of the button',
            defaultValue: undefined,
          })
        })

        it('should return component with properties variant', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[1]).toEqual({
            name: 'variant',
            type: "'primary' | 'black' | 'basic'",
            description: '',
            defaultValue: undefined,
            deprecated: true,
          })
        })

        it('should return component with properties onClick', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[2]).toEqual({
            name: 'onClick',
            type: '() => void | Promise<void>',
            description: '',
            optional: true,
            defaultValue: '() => {}',
          })
        })
      })

      describe('Button', () => {
        const getComponent = (designSystem: DesignSystem) =>
          designSystem.components[1]

        it('should return component with name Button', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).name).toEqual('Button')
        })

        it('should return component with path atoms/button.tsx', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).path).toEqual('atoms/button.tsx')
        })

        it('should return component with description', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).description).toEqual(
            'A Button component',
          )
        })

        it('should return component not deprecated', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).deprecated).toEqual(undefined)
        })

        it('should return component with 3 properties', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties).toHaveLength(3)
        })

        it('should return component with properties children', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[0]).toEqual({
            name: 'children',
            type: 'React.ReactNode',
            description: 'The content of the button',
            defaultValue: undefined,
          })
        })

        it('should return component with properties variant', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[1]).toEqual({
            name: 'variant',
            type: "'primary' | 'black' | 'basic'",
            description: '',
            defaultValue: undefined,
          })
        })

        it('should return component with properties onClick', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[2]).toEqual({
            name: 'onClick',
            type: '() => void | Promise<void>',
            description: '',
            optional: true,
            defaultValue: '() => {}',
          })
        })
      })

      describe('Input', () => {
        const getComponent = (designSystem: DesignSystem) =>
          designSystem.components[2]

        it('should return component with name Input', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).name).toEqual('Input')
        })

        it('should return component with path atoms/input', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).path).toEqual('atoms/input.tsx')
        })

        it('should return component not deprecated', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).deprecated).toEqual(undefined)
        })

        it('should return component with 3 properties', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties).toHaveLength(3)
        })

        it('should return component with properties value', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[0]).toEqual({
            name: 'value',
            type: 'string | number',
            description: '',
            defaultValue: undefined,
          })
        })

        it('should return component with properties onChange', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[1]).toEqual({
            name: 'onChange',
            type: '(value: string) => void',
            description: '',
            defaultValue: '() => {}',
          })
        })

        it('should return component with properties placeholder', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[2]).toEqual({
            name: 'placeholder',
            type: 'string',
            description: '',
            optional: true,
            defaultValue: undefined,
          })
        })
      })

      describe('Card', () => {
        const getComponent = (designSystem: DesignSystem) =>
          designSystem.components[3]

        it('should return component with name Card', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).name).toEqual('Card')
        })

        it('should return component with path molecules/Card', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).path).toEqual('molecules/card.tsx')
        })

        it('should return component not deprecated', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).deprecated).toEqual(undefined)
        })

        it('should return component with 2 properties', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties).toHaveLength(2)
        })

        it('should return component with properties value', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[0]).toEqual({
            name: 'title',
            type: 'React.ReactNode',
            description: '',
            defaultValue: undefined,
          })
        })

        it('should return component with properties value', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[1]).toEqual({
            name: 'description',
            type: 'React.ReactNode',
            description: '',
            defaultValue: undefined,
          })
        })
      })
    })

    describe('pages', () => {
      it('should find all pages', async () => {
        const designSystem = await extractDesignSystem(dirPath)

        expect(designSystem.pages).toHaveLength(3)
      })

      it('should return page how it works', async () => {
        const designSystem = await extractDesignSystem(dirPath)

        expect(designSystem.pages[0].path).toEqual('00-how-it-works.md')
      })

      it('should return page accessibility', async () => {
        const designSystem = await extractDesignSystem(dirPath)

        expect(designSystem.pages[1].path).toEqual('accessibility.md')
      })

      it('should return page internationalization', async () => {
        const designSystem = await extractDesignSystem(dirPath)

        expect(designSystem.pages[2].path).toEqual('internationalization.md')
      })
    })
  })
})
