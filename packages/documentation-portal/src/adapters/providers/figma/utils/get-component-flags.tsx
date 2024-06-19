import { Badge } from '@/components/ui/badge'
import { FigmaComponent } from '../types/figma-component'

export function getComponentFlags(component: FigmaComponent) {
  console.log('component', component)

  return [
    component.providers.figma && !('code' in component.providers) && (
      <Badge className="inline-flex items-center gap-1 bg-orange-400 hover:bg-orange-400">
        Code missing
      </Badge>
    ),
  ].filter(Boolean)
}
