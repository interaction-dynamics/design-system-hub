import { Component } from '@/domain/entities/component'
import { FigmaViewer, getFigmaViewerTitle } from './components/figma-viewer'
import Provider from '@/domain/entities/provider'
import { getLink } from './utils/get-link'
import { getDescription } from './utils/get-description'
import { ComponentVariant } from '@/domain/entities/component-variant'
import { validateFigmaComponent } from './types/figma-component'

export const figma: Provider = {
  type: 'design',
  getDescription(component: Component | ComponentVariant) {
    return validateFigmaComponent(component) ? getDescription(component) : ''
  },
  getViewers(component: Component | ComponentVariant) {
    return [FigmaViewer]
  },
  getViewerTitles(component: Component | ComponentVariant) {
    return [getFigmaViewerTitle()]
  },
  getLinks(component: Component | ComponentVariant) {
    return validateFigmaComponent(component) ? [getLink(component)] : []
  },
}
