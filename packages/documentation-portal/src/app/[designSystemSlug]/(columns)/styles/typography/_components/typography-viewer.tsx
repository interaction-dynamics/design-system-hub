import { TypographyStyle } from '@/domain/entities/style'
import { getStyleViewers } from '@/domain/use-cases/ui-merge-providers'
import { getProvider } from '@/adapters/providers'
import { CodeBlock } from '@/components/atoms/code-block'

function TypographyProperty({
  name,
  value,
}: {
  name: string
  value: string | number
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="font-bold text-foreground">{name}</div>
      <div className="text-foreground">{value}</div>
    </div>
  )
}

export function TypographyViewer({ style }: { style: TypographyStyle }) {
  const viewers = getStyleViewers({ style, getProvider })

  return (
    <div>
      <div className="mt-2 flex flex-col gap-2">
        {viewers.map((Viewer, index) => (
          <Viewer style={style} key={index} />
        ))}
      </div>
      <div className="mt-2">
        <CodeBlock language="css">
          <div>font-family: &quot;{style.metadata.fontFamily}&quot;;</div>
          <div>font-size: {style.metadata.fontSize}px;</div>
          <div>font-weight: {style.metadata.fontWeight};</div>
          <div>line-height: {style.metadata.lineHeight}rem;</div>
          <div>letter-spacing: {style.metadata.letterSpacing};</div>
        </CodeBlock>
      </div>
    </div>
  )
}
