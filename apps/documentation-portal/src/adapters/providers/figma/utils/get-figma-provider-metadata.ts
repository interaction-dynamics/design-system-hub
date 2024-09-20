import { Component } from '@/domain/entities/component'
import { ComponentVariant } from '@/domain/entities/component-variant'
import { validateFigmaComponentProvider } from '../types/figma-component-provider'

export function getFigmaProviderMetadata(
  component: Component | ComponentVariant
) {
  const figmaProvider = component.providers.figma

  if (!validateFigmaComponentProvider(figmaProvider)) {
    throw new Error('Impossible to find Figma provider metadata')
  }

  return figmaProvider
}
