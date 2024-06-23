import Image from 'next/image'

import { Component } from '@/domain/entities/component'
import { ComponentVariant } from '@/domain/entities/component-variant'
import { getFigmaProviderMetadata } from '../utils/get-figma-provider-metadata'
import { ComponentViewerContainer } from '@/components/organisms/component-viewer-container'

export interface FigmaViewerProps {
  component: Component | ComponentVariant
}

export function FigmaComponentViewer({ component }: FigmaViewerProps) {
  if (!component) return <></>

  if ('variants' in component && component.variants.length > 0) {
    return <FigmaComponentViewer component={component.variants[0]} />
  }

  const figmaProvider = getFigmaProviderMetadata(component)

  return (
    <ComponentViewerContainer>
      <Image
        priority
        className="relative z-20"
        src={figmaProvider.thumbnailUrl}
        alt={component.name}
        width={figmaProvider.width}
        height={figmaProvider.height}
      />
    </ComponentViewerContainer>
  )
}

export function getFigmaViewerTitle() {
  return 'Figma'
}
