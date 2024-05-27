import Image from 'next/image'

import SvgGrid from '@/components/atoms/svg-grid'
import { Component } from '@/domain/entities/component'
import { ComponentVariant } from '@/domain/entities/component-variant'
import { getFigmaProviderMetadata } from '../utils/get-figma-provider-metadata'

export interface FigmaViewerProps {
  component: Component | ComponentVariant
}

export function FigmaViewer({ component }: FigmaViewerProps) {
  if (!component) return <></>

  if ('variants' in component && component.variants.length > 0) {
    return <FigmaViewer component={component.variants[0]} />
  }

  const figmaProvider = getFigmaProviderMetadata(component)

  return (
    <div className="relative min-h-20 p-4 flex items-center justify-center">
      <SvgGrid />
      <Image
        className="relative z-20"
        src={figmaProvider.thumbnailUrl}
        alt={component.name}
        width={figmaProvider.width}
        height={figmaProvider.height}
      />
    </div>
  )
}

export function getFigmaViewerTitle() {
  return 'Figma'
}
