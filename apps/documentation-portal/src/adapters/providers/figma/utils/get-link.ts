import { ActionLink } from '@/domain/entities/provider'
import { FigmaComponent } from '../types/figma-component'

export function getLink(component: FigmaComponent): ActionLink {
  return {
    label: 'Open in Figma',
    href: `https://www.figma.com/design/${component.providers.figma.fileKey}?node-id=${component.providers.figma.nodeId}`,
    order: 0,
  }
}
