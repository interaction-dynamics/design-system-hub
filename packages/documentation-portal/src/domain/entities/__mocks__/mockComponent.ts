import buildMock from '@/__mocks__/buildMock'
import { Component } from '../component'

const defaultComponent: Component = {
  name: 'Foo',
  slug: 'foo',
  properties: [],
  variants: [],
  providers: {},
}

export const mockComponent = buildMock<Component>(defaultComponent)
