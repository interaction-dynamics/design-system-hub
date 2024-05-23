import parseFigma from '../parseFigmaFiles'
import figmaResponseBasic from '../__fixtures__/figmaResponseBasic.json'
import figmaResponseWithVariants from '../__fixtures__/figmaResponseWithVariants.json'

describe('parseFigma', () => {
  describe('no file', () => {
    it('should set empty design system name', () => {
      const figmaResponse: any[] = []

      const designSystem = parseFigma(figmaResponse)

      expect(designSystem.name).toBe('')
    })
  })

  describe('basic file', () => {
    it('should set design system name', () => {
      const figmaResponse = [figmaResponseBasic]

      const designSystem = parseFigma(figmaResponse)

      expect(designSystem.name).toBe('Example Design System')
    })

    it('should set design system slug', () => {
      const figmaResponse = [figmaResponseBasic]

      const designSystem = parseFigma(figmaResponse)

      expect(designSystem.slug).toBe('example-design-system')
    })

    it('should add section principles', () => {
      const figmaResponse = [figmaResponseBasic]

      const designSystem = parseFigma(figmaResponse)

      expect(designSystem.chapters?.[0].type).toEqual('principles')
    })

    describe('component', () => {
      it('should add components', () => {
        const figmaResponse = [figmaResponseBasic]

        const designSystem = parseFigma(figmaResponse)

        expect(designSystem.components).toHaveLength(3)
        expect(designSystem.components?.[0].name).toEqual('Button')
        expect(designSystem.components?.[1].name).toEqual('Card')
        expect(designSystem.components?.[2].name).toEqual('Input')
      })

      it('should add figma key in component', () => {
        const figmaResponse = [figmaResponseBasic]

        const designSystem = parseFigma(figmaResponse)

        expect(designSystem.components?.[0].origin.figma?.key).toEqual(
          '839dd2723ace0b9e6dd926a3d3b9d803858e7102'
        )
      })
    })
  })

  describe('with Variants', () => {
    it('should set design system name', () => {
      const figmaResponse = [figmaResponseWithVariants]

      const designSystem = parseFigma(figmaResponse)

      expect(designSystem.name).toBe('Example Design System - With Variants')
    })

    it('should set design system slug', () => {
      const figmaResponse = [figmaResponseWithVariants]

      const designSystem = parseFigma(figmaResponse)

      expect(designSystem.slug).toBe('example-design-system---with-variants')
    })

    it('should add section principles', () => {
      const figmaResponse = [figmaResponseWithVariants]

      const designSystem = parseFigma(figmaResponse)

      expect(designSystem.chapters?.[0].type).toEqual('principles')
    })

    describe('component', () => {
      it('should add components', () => {
        const figmaResponse = [figmaResponseWithVariants]

        const designSystem = parseFigma(figmaResponse)

        expect(designSystem.components).toHaveLength(3)
        expect(designSystem.components?.[0].name).toEqual('Button')
        expect(designSystem.components?.[1].name).toEqual('Card')
        expect(designSystem.components?.[2].name).toEqual('Input')
      })

      it('should add figma key in component', () => {
        const figmaResponse = [figmaResponseWithVariants]

        const designSystem = parseFigma(figmaResponse)

        expect(designSystem.components).toHaveLength(3)
        expect(designSystem.components?.[1].origin.figma?.key).toEqual(
          'f9ad1a4ffc2d68dec408d6498a46277ee11846d2'
        )
      })

      it('should add variant', () => {
        const figmaResponse = [figmaResponseWithVariants]

        const designSystem = parseFigma(figmaResponse)

        expect(designSystem.components).toHaveLength(3)
        expect(designSystem.components?.[0].variants).toEqual([
          {
            origin: {
              figma: {
                height: 46,
                key: 'fae8148d9600e5bccc81c202147ac940b2b14b7b',
                width: 197,
              },
            },
          },
          {
            origin: {
              figma: {
                key: '71ee75340d5fec0ac6b479488544d4ff2f22f129',
                height: 46,
                width: 197,
              },
            },
          },
          {
            origin: {
              figma: {
                key: '5e938cf483f9edde6e10a28e6cc9ffa8a78be9e9',
                height: 46,
                width: 197,
              },
            },
          },
        ])
      })
    })
  })
})
