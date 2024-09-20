import { FigmaComponent } from '../types/figma-component'
import { Flag } from '@/domain/entities/provider'

export function getComponentFlags(component: FigmaComponent) {
  const flags: Flag[] = []

  if (component.providers.figma && !('code' in component.providers)) {
    flags.push({
      type: 'warning',
      label: 'Missing code',
      description:
        'This component is not available in code. It may be a design-only component.',
    })
  }

  return flags
}
