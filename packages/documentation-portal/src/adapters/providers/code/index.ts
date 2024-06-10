import { Component } from '@/domain/entities/component'
import { ComponentVariant } from '@/domain/entities/component-variant'
import Provider from '@/domain/entities/provider'
import { validateCodeComponent } from './types/code-component'
import { DesignSystem } from '@/domain/entities/design-system'
import { getLinks } from './utils/get-links'

export const code: Provider = {
  type: 'development',
  getDescription(component: Component | ComponentVariant) {
    return validateCodeComponent(component)
      ? component.providers.code.description
      : ''
  },
  getViewers(component: Component | ComponentVariant) {
    return []
  },
  getViewerTitles(component: Component | ComponentVariant) {
    return []
  },
  getLinks(
    component: Component | ComponentVariant,
    designSystem: DesignSystem
  ) {
    return validateCodeComponent(component)
      ? getLinks(component, designSystem)
      : []
  },
}
