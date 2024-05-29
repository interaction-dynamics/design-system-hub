import { Component } from '../entities/component'
import { ComponentVariant } from '../entities/component-variant'
import Provider from '../entities/provider'

type ProviderGetter = (providerId: string) => Provider | null

function getProviders(
  component: Component | ComponentVariant,
  getProvider: ProviderGetter
): Provider[] {
  return Object.keys(component.providers)
    .map((providerId) => getProvider(providerId))
    .filter((provider): provider is Provider => provider !== undefined)
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
  getProvider,
}: {
  component: Component | ComponentVariant
  getProvider: ProviderGetter
}) {
  return getProviders(component, getProvider).flatMap((provider) =>
    provider.getLinks(component)
  )
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
