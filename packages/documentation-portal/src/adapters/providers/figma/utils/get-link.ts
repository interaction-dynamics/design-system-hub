import { FigmaComponent } from '../types/figma-component'

export function getLink(component: FigmaComponent) {
  return {
    label: 'Open in Figma',
    href: `https://www.figma.com/design/${component.providers.figma.fileKey}?node-id=${component.providers.figma.nodeId}`,
  }
}
