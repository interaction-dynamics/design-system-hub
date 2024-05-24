import PartialPage from './partial-page'

export default interface Chapter {
  type: 'getting-started' | 'principles' | 'foundations' | 'components'
  pages: PartialPage[]
}
