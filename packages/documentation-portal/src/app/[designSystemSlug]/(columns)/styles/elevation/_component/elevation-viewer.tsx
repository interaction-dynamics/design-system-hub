import { CodeBlock } from '@/components/atoms/code-block'
import { ElevationStyle } from '@/domain/entities/style'

export function ElevationViewer({ style }: { style: ElevationStyle }) {
  const boxShadow = `${style.metadata.offsetX}px ${style.metadata.offsetY}px ${style.metadata.blurRadius}px ${style.metadata.spreadRadius}px ${style.metadata.color}`

  return (
    <div>
      <div className="bg-white p-10 flex items-center justify-center">
        <div
          className="rounded h-20 w-40 border"
          style={{
            boxShadow,
          }}
        ></div>
      </div>
      <div className="mb-4 mt-8">
        <CodeBlock language="css">box-shadow: {boxShadow};</CodeBlock>
      </div>
    </div>
  )
}
