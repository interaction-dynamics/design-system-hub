import { Property } from '../property'
import { buildMock } from './build-mock'

export const buildProperty = buildMock<Property>({
  name: 'property',
  type: 'string',
})
