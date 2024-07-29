import { Component } from '@/domain/entities/component'
import {
  FigmaComponentViewer,
  getFigmaViewerTitle,
} from './components/figma-component-viewer'
import Provider from '@/domain/entities/provider'
import { getLink } from './utils/get-link'
import { getDescription } from './utils/get-description'
import { ComponentVariant } from '@/domain/entities/component-variant'
import { validateFigmaComponent } from './types/figma-component'
import { getComponentFlags } from './utils/get-component-flags'
import { validateFigmaStyle } from './types/figma-style'
import { Style } from '@/domain/entities/style'
import { FigmaStyleViewer } from './components/figma-style-viewer'
import { FigmaSettings } from './components/figma-settings'

export const figma: Provider = {
  name: 'Figma',
  description: 'Import the specifications of the design systems from Figma',

  type: 'design',
  getDescription(component: Component | ComponentVariant) {
    return validateFigmaComponent(component) ? getDescription(component) : ''
  },
  getViewers(component: Component | ComponentVariant) {
    return [FigmaComponentViewer]
  },
  getViewerTitles(component: Component | ComponentVariant) {
    return [getFigmaViewerTitle()]
  },
  getLinks(component: Component | ComponentVariant) {
    return validateFigmaComponent(component) ? [getLink(component)] : []
  },
  getComponentFlags(component: Component | ComponentVariant) {
    return validateFigmaComponent(component) ? getComponentFlags(component) : []
  },
  getStyleViewers(style: Style) {
    return validateFigmaStyle(style) ? [FigmaStyleViewer] : []
  },
  getSettings() {
    return FigmaSettings
  },
}
