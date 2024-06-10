import buildMock from '@/__mocks__/buildMock'
import { DesignSystem } from '../design-system'

const defaultDesignSystem: DesignSystem = {
  id: 'foo',
  slug: 'design-system',
  name: 'Design System',
  providers: {},
}

export const mockDesignSystem = buildMock<DesignSystem>(defaultDesignSystem)
