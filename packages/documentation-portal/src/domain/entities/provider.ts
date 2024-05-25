import { Component } from './component'
import { ComponentVariant } from './component-variant'

interface ActionLink {
  href: string
  label: string
}

type ViewerType = (props: {
  component: Component | ComponentVariant
}) => JSX.Element

export default interface Provider {
  type: 'design' | 'development'

  getDescription(component: Component | ComponentVariant): string

  getLinks(component: Component | ComponentVariant): ActionLink[]

  getViewers(component: Component | ComponentVariant): ViewerType[]

  getViewerTitles(component: Component | ComponentVariant): string[]
}
