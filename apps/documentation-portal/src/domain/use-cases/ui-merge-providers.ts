import { Component } from '../entities/component'
import { ComponentVariant } from '../entities/component-variant'
import { DesignSystem } from '../entities/design-system'
import Provider from '../entities/provider'
import { Style } from '../entities/style'

type ProviderGetter = (providerId: string) => Provider | undefined

function getProviders(
  component: Component | ComponentVariant,
  getProvider: ProviderGetter
): Provider[] {
  return Object.keys(component.providers)
    .map((providerId) => getProvider(providerId))
    .filter((provider): provider is Provider => Boolean(provider))
}

export function getDescription({
  component,
  getProvider,
}: {
  component: Component | ComponentVariant
  getProvider: ProviderGetter
}) {
  return getProviders(component, getProvider).flatMap((provider) =>
    provider.getDescription(component)
  )
}

export function getLinks({
  component,
  designSystem,
  getProvider,
}: {
  component: Component | ComponentVariant
  designSystem: DesignSystem
  getProvider: ProviderGetter
}) {
  return getProviders(component, getProvider)
    .flatMap((provider) => provider.getLinks(component, designSystem))
    .sort((a, b) => a.order - b.order)
}

export function getViewers({
  component,
  getProvider,
}: {
  component: Component | ComponentVariant
  getProvider: ProviderGetter
}) {
  return getProviders(component, getProvider).flatMap((provider) =>
    provider.getViewers(component)
  )
}

export function getViewerTitles({
  component,
  getProvider,
}: {
  component: Component | ComponentVariant
  getProvider: ProviderGetter
}) {
  return getProviders(component, getProvider).flatMap((provider) =>
    provider.getViewerTitles(component)
  )
}

export function getComponentFlags({
  component,
  getProvider,
}: {
  component: Component | ComponentVariant
  getProvider: ProviderGetter
}) {
  return getProviders(component, getProvider).flatMap((provider) =>
    provider.getComponentFlags(component)
  )
}

function getStyleProviders(
  style: Style,
  getProvider: ProviderGetter
): Provider[] {
  return Object.keys(style.providers)
    .map((providerId) => getProvider(providerId))
    .filter((provider): provider is Provider => Boolean(provider))
}

export function getStyleViewers({
  style,
  getProvider,
}: {
  style: Style
  getProvider: ProviderGetter
}) {
  return getStyleProviders(style, getProvider).flatMap((provider) =>
    provider.getStyleViewers(style)
  )
}
