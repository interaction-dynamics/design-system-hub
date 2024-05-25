import SynchronizedData from '@/domain/use-cases/synchronization/types/SynchronizedData'
import PartialPage from './partial-page'

export interface Page extends PartialPage {
  content: SynchronizedData<string>
}
