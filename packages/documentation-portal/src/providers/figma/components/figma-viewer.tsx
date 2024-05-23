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
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 z-0"
      >
        <defs>
          <pattern
            id="smallGrid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="lightblue"
              stroke-width="0.5"
              className="stroke-slate-300 dark:stroke-slate-700"
            />
          </pattern>
          <pattern
            id="grid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              className="stroke-slate-300 dark:stroke-slate-700"
              stroke-width="1"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
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
