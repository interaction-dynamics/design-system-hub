import { Component } from './component'

export interface DesignSystem {
  components: Component[]
  provider: {
    relativePath: string
    url: string
  }
}
