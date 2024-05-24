import SvgGrid from '@/components/atoms/svg-grid'
import Component, {
  ComponentVariant,
} from '@/features/component/types/Component'
import Image from 'next/image'

export interface FigmaViewerProps {
  component: Component | ComponentVariant
}

function FigmaViewer({ component }: FigmaViewerProps) {
  console.log('component', component)
  if (!component) return <></>

  if ('variants' in component && component.variants.length > 0) {
    return <FigmaViewer component={component.variants[0]} />
  }

  return (
    <div className="relative min-h-20 p-4 flex items-center justify-center">
      <SvgGrid />
      <Image
        className="relative z-20"
        src={component.thumbnailUrl?.figma ?? ''}
        alt={component.name}
        width={component.origin.figma?.width}
        height={component.origin.figma?.height}
      />
    </div>
  )
}

FigmaViewer.label = 'Figma'

export default FigmaViewer
