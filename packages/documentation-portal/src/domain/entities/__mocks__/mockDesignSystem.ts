import buildMock from '@/__mocks__/buildMock'
import { DesignSystem } from '../design-system'

const defaultDesignSystem: DesignSystem = {
  id: 'foo',
  slug: 'design-system',
  name: 'Design System',
  providers: {},
  isPublic: false,
}

export const mockDesignSystem = buildMock<DesignSystem>(defaultDesignSystem)
