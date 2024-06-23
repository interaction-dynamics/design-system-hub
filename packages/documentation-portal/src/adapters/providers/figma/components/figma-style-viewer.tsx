import Image from 'next/image'
import { FigmaStyle } from '../types/figma-style'

interface Props {
  style: FigmaStyle
}

export function FigmaStyleViewer({ style }: Props) {
  return (
    <Image
      src={style.providers.figma.thumbnailUrl}
      alt={style.name}
      width={style.providers.figma.width}
      height={style.providers.figma.height}
      className="bg-white"
    />
  )
}
