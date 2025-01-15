import { DotPattern } from '@/components/ui/dot-pattern'
import { Component } from '@/entities/component'
import { useGenerateIframeUrl } from './hooks/use-generate-iframe-url'
import { PropertiesValues } from './types/properties-values'

export interface ComponentRendererProps {
  component: Component
  properties: PropertiesValues
}

export function ComponentRenderer({
  component,
  properties,
}: ComponentRendererProps) {
  const url = useGenerateIframeUrl(component, properties)

  return (
    <div className='relative h-full w-full overflow-hidden'>
      <DotPattern className='opacity-50' />
      <iframe className='h-full w-full bg-transparent' src={url} />
    </div>
  )
}
