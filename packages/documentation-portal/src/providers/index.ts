import Component, {
  ComponentVariant,
} from '@/features/component/types/Component'

import * as figma from './figma'
import * as localCode from './localCode'

const providers = { figma, localCode } as const

const isKey = (key: string): key is keyof typeof providers => key in providers

export function getLinks(component: Component | ComponentVariant) {
  return Object.keys(component.origin)
    .map((origin) =>
      isKey(origin) ? providers[origin]?.getLink(component) : null
    )
    .filter((link): link is { label: string; href: string } => link !== null)
}

export function getDescription(component: Component | ComponentVariant) {
  return Object.values(component.description ?? {}).join('\n')
}

export interface ComponentOrigin {
  figma?: figma.FigmaComponentOrigin
  localCode?: localCode.LocalCodeComponentOrigin
}

type ViewerType = (props: {
  component: Component | ComponentVariant
}) => JSX.Element

export function getViewers(component: Component | ComponentVariant) {
  return Object.keys(component.origin)
    .flatMap((origin) =>
      isKey(origin) ? providers[origin]?.getViewers() : null
    )
    .filter((viewer): viewer is ViewerType => viewer !== null)
}
