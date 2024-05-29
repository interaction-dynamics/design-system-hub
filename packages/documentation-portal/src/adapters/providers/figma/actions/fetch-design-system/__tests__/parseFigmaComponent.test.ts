import parseFigmaComponent from '../parseFigmaComponent'

import figmaComponentReponseBasic from '../__fixtures__/figmaComponentResponseBasic.json'
import { PartialComponent } from '@/domain/entities/partial-component'

describe('parseFigmaComponent', () => {
  describe('Basic', () => {
    it('should parse figma component', () => {
      const partialComponent: PartialComponent = {
        name: 'Button',
        slug: 'button',
        variants: [],
        providers: {
          figma: {
            key: '839dd2723ace0b9e6dd926a3d3b9d803858e7102',
            nodeId: '128:5',
            fileKey: 'ICwWZglMh0T3hvcMxag3t7',
            width: 10,
            height: 12,
          },
        },
      }
      const component = parseFigmaComponent(
        figmaComponentReponseBasic.meta,
        partialComponent
      )

      expect(component.name).toBe('Button')
      expect(component.slug).toBe('button')
      expect(component.providers.figma.description).toBe(
        'A description about the button'
      )
      expect(component.providers.figma.thumbnailUrl).toBe(
        'https://s3-alpha.figma.com/checkpoints/J2k/99O/aeS13wvIosaGEXpi/128_5.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ4GOSFWCYUZSDOWS%2F20240523%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240523T000000Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=4feffbd2932077ed3575e44de0bf77f3f9693db4fab7b55c546706e695bd46f9'
      )
      expect(component.providers.figma?.key).toBe(
        '839dd2723ace0b9e6dd926a3d3b9d803858e7102'
      )
      expect(component.providers.figma?.nodeId).toBe('128:5')
      expect(component.providers.figma?.fileKey).toBe('ICwWZglMh0T3hvcMxag3t7')

      expect(component.providers.figma?.width).toBe(10)
      expect(component.providers.figma?.height).toBe(12)
    })
  })
})
