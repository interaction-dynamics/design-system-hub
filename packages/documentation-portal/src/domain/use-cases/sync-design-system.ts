import { Component } from '../entities/component'
import { DesignSystem } from '../entities/design-system'
import { PartialComponent } from '../entities/partial-component'

interface SyncDesignSystemContext {
  createDesignSystem: (
    designSystem: DesignSystem,
    components: Component[]
  ) => Promise<void>
  fetchDesignSystem: (
    providerId: string[]
  ) => Promise<{ designSystem: DesignSystem; components: Component[] }>
}

export async function syncDesignSystem(
  { createDesignSystem, fetchDesignSystem }: SyncDesignSystemContext,
  { ids }: { ids: string[] }
) {
  const { designSystem, components } = await fetchDesignSystem(ids)

  await createDesignSystem(designSystem, components)
}
