import { Component } from './Component'

export interface DesignSystem {
  components: Component[]
  provider: {
    relativePath: string
    url: string
  }
}
