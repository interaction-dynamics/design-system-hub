import { Component } from './component'
import { Page } from './page'

export interface DesignSystem {
  components: Component[]
  provider: {
    relativePath: string
    url: string
  }
  pages: Page[]
}
