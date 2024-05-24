import SynchronizedData from '@/features/synchronization/types/SynchronizedData'
import PartialPage from './partial-page'

export default interface Page extends PartialPage {
  content: SynchronizedData<string>
}
