import Component, {
  ComponentVariant,
} from '@/features/component/types/Component'
import FigmaViewer from './components/figma-viewer'

export * from './types/FigmaComponentOrigin'

export * from './utils/getLink'

export function getViewers() {
  return [FigmaViewer]
}
