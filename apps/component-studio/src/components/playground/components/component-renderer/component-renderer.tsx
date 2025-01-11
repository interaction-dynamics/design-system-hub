import { DotPattern } from '@/components/ui/dot-pattern'
import { Component } from '@/entities/component'
import { useMemo, useState } from 'react'

export interface ComponentRendererProps {
  component: Component
  properties: Record<string, any>
}

const HOST = 'http://localhost:5555'

export function ComponentRenderer({
  component,
  properties,
}: ComponentRendererProps) {
  const url = useMemo(() => {
    const path = `${HOST}/${component.path}`
    const url = new URL(path)
    url.searchParams.set('props', JSON.stringify(properties))

    return url.toString()
  }, [properties, component.path])

  const [iframeError, setIframeError] = useState<React.SyntheticEvent>()

  return (
    <div className='relative h-full w-full overflow-hidden'>
      <DotPattern className='opacity-50' />
      {iframeError ? (
        <div>error</div>
      ) : (
        <iframe className='h-full w-full bg-transparent' src={url} />
      )}
    </div>
  )
}
