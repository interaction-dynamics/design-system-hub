import { Component } from './component'
import { ComponentVariant } from './component-variant'
import { DesignSystem } from './design-system'

export interface ActionLink {
  href: string
  label: string
  order: number
}

type ViewerType = (props: {
  component: Component | ComponentVariant
}) => JSX.Element

export default interface Provider {
  type: 'design' | 'development'

  getDescription(component: Component | ComponentVariant): string

  getLinks(
    component: Component | ComponentVariant,
    DesignSystem: DesignSystem
  ): ActionLink[]

  getViewers(component: Component | ComponentVariant): ViewerType[]

  getViewerTitles(component: Component | ComponentVariant): string[]

  getComponentFlags(component: Component | ComponentVariant): React.ReactNode[]
}
