import buildMock from '@/__mocks__/buildMock'
import { FigmaComponent } from '../fetchFigmaComponent'

const mockFigmaComponent = buildMock<FigmaComponent>({
  key: 'foo',
  file_key: 'bar',
  node_id: 'baz',
  thumbnail_url: 'https://thumbnail.com',
  name: 'Button',
  description: 'Description',
  updated_at: '2021-01-01',
  created_at: '2021-01-12',
})

export default mockFigmaComponent
