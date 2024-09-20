import { getDescription } from '@/domain/use-cases/ui-merge-providers'
import { getProvider } from '@/adapters/providers'
import { Component } from '@/domain/entities/component'
import { Markdown } from '@/components/atoms/markdown'

interface Props {
  component: Component
}

export function ComponentDescription({ component }: Props) {
  const descriptions = getDescription({ component, getProvider })

  return (
    <div>
      {descriptions.map((p) => (
        <Markdown key={p}>{p}</Markdown>
      ))}
    </div>
  )
}
