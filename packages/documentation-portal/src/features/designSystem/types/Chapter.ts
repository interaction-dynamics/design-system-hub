import PartialPage from './PartialPage'

export default interface Chapter {
  type: 'getting-started' | 'principles' | 'foundations' | 'components'
  pages: PartialPage[]
}
