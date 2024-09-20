import parseFigma from '../parseFigmaFiles'
import figmaResponseBasic from '../__fixtures__/figmaResponseBasic.json'
import figmaResponseWithVariants from '../__fixtures__/figmaResponseWithVariants.json'

describe('parseFigma', () => {
  describe('no file', () => {
    it('should set empty design system name', () => {
      const figmaResponse: any[] = []

      const { designSystem } = parseFigma(figmaResponse)

      expect(designSystem.name).toBe('')
    })
  })

  describe('basic file', () => {
    it('should set design system name', () => {
      const figmaResponse = [figmaResponseBasic]

      const { designSystem } = parseFigma(figmaResponse)

      expect(designSystem.name).toBe('Example Design System')
    })

    it('should set design system slug', () => {
      const figmaResponse = [figmaResponseBasic]

      const { designSystem } = parseFigma(figmaResponse)

      expect(designSystem.slug).toBe('example-design-system')
    })

    describe('component', () => {
      it('should add components', () => {
        const figmaResponse = [figmaResponseBasic]
        const key1 = '7251261873f3e8a38f1190bb2ff64656591d052b'
        const key2 = '839dd2723ace0b9e6dd926a3d3b9d803858e7102'
        const key3 = 'b59f703a80ae8787bb179bdcf33bad4d216c8fad'

        const { figmaComponents } = parseFigma(figmaResponse)

        expect(figmaComponents).toHaveLength(3)
        expect(figmaComponents[0].providers.figma.key).toEqual(key1)
        expect(figmaComponents[1].providers.figma.key).toEqual(key2)
        expect(figmaComponents[2].providers.figma.key).toEqual(key3)
      })
    })
  })

  describe('with Variants', () => {
    it('should set design system name', () => {
      const figmaResponse = [figmaResponseWithVariants]

      const { designSystem } = parseFigma(figmaResponse)

      expect(designSystem.name).toBe('Example Design System - With Variants')
    })

    it('should set design system slug', () => {
      const figmaResponse = [figmaResponseWithVariants]

      const { designSystem } = parseFigma(figmaResponse)

      expect(designSystem.slug).toBe('example-design-system---with-variants')
    })

    describe('component', () => {
      it('should add components', () => {
        const figmaResponse = [figmaResponseWithVariants]
        const key1 = 'f9ad1a4ffc2d68dec408d6498a46277ee11846d2'
        const key2 = '6528643c1eacc3d285dab161969d956a7c8b14ce'
        const key3 = '679aee64b3b09229f6f9c2d9bc62e1e20680b3d0'

        const { figmaComponents } = parseFigma(figmaResponse)

        expect(figmaComponents).toHaveLength(3)
        expect(figmaComponents[0].providers.figma?.key).toEqual(key1)
        expect(figmaComponents[1].providers.figma?.key).toEqual(key2)
        expect(figmaComponents[2].providers.figma?.key).toEqual(key3)
      })
    })
  })
})
