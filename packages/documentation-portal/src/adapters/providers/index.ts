import Provider from '@/domain/entities/provider'
import { figma } from './figma'
import { code } from './code'

const providers: Record<string, Provider> = { figma, code } as const

const isProviderId = (key: string): key is keyof typeof providers =>
  key in providers

export function getProvider(providerId: string) {
  return isProviderId(providerId) ? providers[providerId] : undefined
}

export function getProviders() {
  return Object.entries(providers)
}
