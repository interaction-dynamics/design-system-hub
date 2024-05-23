import Component, {
  ComponentVariant,
} from '@/features/component/types/Component'

export * from './utils/getLink'

export * from './types/LocalCodeComponentOrigin'

function Viewer({ component }: { component: Component | ComponentVariant }) {
  return <></>
}

export function getViewers() {
  return [Viewer]
}
