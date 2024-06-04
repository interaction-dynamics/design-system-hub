import { Component } from './Component'
import { Project } from './Project'
import { Repository } from './Repository'

export interface DesignSystem {
  components: Component[]
  relativePath: string
  repository: Repository
  project: Project
}
