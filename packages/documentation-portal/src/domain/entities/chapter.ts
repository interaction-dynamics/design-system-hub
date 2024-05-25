import { PartialPage } from './partial-page'

export interface Chapter {
  type: 'getting-started' | 'principles' | 'foundations' | 'components'
  pages: PartialPage[]
}
