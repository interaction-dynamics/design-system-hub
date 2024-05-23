import SynchronizedData from '@/features/synchronization/types/SynchronizedData'
import PartialPage from './PartialPage'

export default interface Page extends PartialPage {
  content: SynchronizedData<string>
}
