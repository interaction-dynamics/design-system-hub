import Markdown from 'react-markdown'

import { getDescription } from '@/domain/use-cases/ui-merge-providers'
import { getProvider } from '@/adapters/providers'
import { Component } from '@/domain/entities/component'

interface Props {
  component: Component
}

export function ComponentDescription({ component }: Props) {
  const descriptions = getDescription({ component, getProvider })

  return (
    <div>
      {descriptions.map((p) => (
        <Markdown
          components={{
            blockquote(props) {
              return (
                <blockquote className="bg-muted p-2 rounded-md my-1 text-primary text-sm">
                  {props.children}
                </blockquote>
              )
            },
          }}
          key={p}
        >
          {p}
        </Markdown>
      ))}
    </div>
  )
}
