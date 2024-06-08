import { Component } from './component2'

export interface DesignSystem {
  components: Component[]
  provider: {
    relativePath: string
    url: string
  }
}
