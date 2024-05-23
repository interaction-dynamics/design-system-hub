import { ComponentOrigin } from '@/providers'

export interface PartialComponentVariant {
  origin: ComponentOrigin
}

export default interface PartialComponent {
  name: string
  slug: string
  origin: ComponentOrigin
  variants: PartialComponentVariant[]
}
