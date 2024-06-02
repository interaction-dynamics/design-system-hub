import { Component } from './Component'
import { Repository } from './Repository'

export interface DesignSystem {
  components: Component[]
  relativePath: string
  repository: Repository
}
