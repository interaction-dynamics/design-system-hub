import Chapter from './chapter'
import PartialComponent from '@/features/component/types/PartialComponent'

export default interface DesignSystem {
  name: string
  slug: string
  chapters: Chapter[]
  components: PartialComponent[]
}
