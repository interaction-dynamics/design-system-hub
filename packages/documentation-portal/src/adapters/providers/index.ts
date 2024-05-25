import Provider from '@/domain/entities/provider'
import { figma } from './figma'

const providers: Record<string, Provider> = { figma } as const

const isProviderId = (key: string): key is keyof typeof providers =>
  key in providers

export function getProvider(providerId: string) {
  return isProviderId(providerId) ? providers[providerId] : null
}
