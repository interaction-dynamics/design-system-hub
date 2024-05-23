import SynchronizationStatus from '@/features/synchronization/types/SynchronizationStatus'
import Property from './Property'
import SynchronizedData from '@/features/synchronization/types/SynchronizedData'
import PartialComponent, { PartialComponentVariant } from './PartialComponent'

export interface ComponentVariant extends PartialComponentVariant {
  name: string
  slug: string
  description?: SynchronizedData<string>
  thumbnailUrl: SynchronizedData<string>
}

export default interface Component extends PartialComponent {
  synchronizationStatus?: SynchronizationStatus
  description?: SynchronizedData<string>
  thumbnailUrl: SynchronizedData<string>
  properties?: Property[]
  variants: ComponentVariant[]
}
