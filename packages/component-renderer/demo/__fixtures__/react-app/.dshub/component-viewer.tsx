import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface Props {
  component: {
    name: string
    path: string
  }
  container: () => Promise<Record<string, unknown>>
}

const cleanProperty = (key: string, value: unknown) => {
  if (
    typeof value === 'object' &&
    value &&
    'type' in value &&
    value.type === 'callback'
  ) {
    return (...args: unknown[]) => {
      window.parent.postMessage({ type: 'callback', source: key }, '*')
    }
  }

  return value
}

type Properties = Record<string, unknown>

const getProperties = <P extends Properties>(props: string): P => {
  try {
    const properties = Object.fromEntries(
      Object.entries(JSON.parse(props)).map(([key, value]) => [
        key,
        cleanProperty(key, value),
      ]),
    )

    return properties as P
  } catch (error) {
    console.error('error', error)
    return null
  }
}

export function ComponentViewer<P extends Properties>({
  component,
  container,
}: Props) {
  const [Component, setComponent] = useState<Record<string, React.FC<P>>>(null)
  const [searchParams] = useSearchParams()

  const defaultProps = {}

  const newProperties = getProperties<P>(
    decodeURIComponent(searchParams.get('props')),
  )

  if (!newProperties) return <>Error</>

  const properties: P = {
    ...defaultProps,
    ...newProperties,
  }

  useEffect(() => {
    container().then(module => {
      /**
       * We need to save all the module because just saving the module[component.name]
       * introduces a bug
       */
      setComponent(module as Record<string, React.FC<P>>)
    })
  }, [component, container])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {Component && Component[component.name](properties)}
    </div>
  )
}
