import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface Props {
  component: {
    name: string
    path: string
  }
  containers: any
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

const getProperties = (props: string) => {
  try {
    return Object.fromEntries(
      Object.entries(JSON.parse(props)).map(([key, value]) => [
        key,
        cleanProperty(key, value),
      ])
    )
  } catch (error) {
    console.log('error', error)
    return {}
  }
}

export function ComponentViewer({ component, containers }: Props) {
  const [Export, setExport] = useState<any>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultProps = {}

  const newProperties = getProperties(searchParams.get('props'))

  const properties = {
    ...defaultProps,
    ...newProperties,
  }

  useEffect(() => {
    containers[component.name]().then((module: any) => {
      setExport(module)
    })
  }, [component, containers])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {Export && Export[component.name](properties)}
    </div>
  )
}
