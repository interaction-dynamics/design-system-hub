import { Badge } from '@/components/ui/badge'
import { Component } from '@/domain/entities/component'
import { getComponentFlags } from '@/domain/use-cases/ui-merge-providers'
import { getProvider } from '@/adapters/providers'

interface Props {
  component: Component
}

export function ComponentFlags({ component }: Props) {
  const flags = getComponentFlags({ component, getProvider })

  if (flags.length === 0) return <></>

  return (
    <div className="flex items-center gap-1">{flags.map((flag) => flag)}</div>
  )
}
