import { Flag } from '@/domain/entities/provider'
import { CodeComponent } from '../types/code-component'

export function getComponentFlags(component: CodeComponent): Flag[] {
  const flags: Flag[] = []

  if (component.providers.code.deprecated) {
    flags.push({
      type: 'warning',
      label: 'Deprecated',
      description:
        'This component is deprecated and should not be used in new projects',
    })
  }

  if (!component.providers.figma) {
    flags.push({
      type: 'warning',
      label: 'Missing design',
      description:
        'This component does not have a design available. It may be a code-only component.',
    })
  }

  return flags
}
