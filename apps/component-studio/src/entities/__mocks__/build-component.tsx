import { Component } from '../component'
import { buildMock } from './build-mock'

export const buildComponent = buildMock<Component>({
  name: 'component',
  path: 'foo/bar',
  description: 'description',
  properties: [],
})
