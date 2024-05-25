import { FigmaComponent } from '../types/figma-component'

export function getDescription(component: FigmaComponent): string {
  return component.providers.figma.description
}
