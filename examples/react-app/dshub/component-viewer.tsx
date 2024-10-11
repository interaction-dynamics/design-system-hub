import { useEffect, useState } from 'react'
import { PropertiesEditor } from './properties-editor'

interface Props {
  component: {
    name: string
    path: string
  }
  containers: any
}

export function ComponentViewer({ component, containers }: Props) {
  const [Export, setExport] = useState<any>(null)

  const [properties, setProperties] = useState({
    children: 'foo',
    variant: 'primary',
  })

  useEffect(() => {
    containers[component.name]().then((module: any) => {
      console.log('module', module.Button)
      console.log('component', component.name)
      setExport(module)
    })
  }, [component, containers])

  return (
    <div>
      <h1>{component.name}</h1>
      {Export && Export[component.name](properties)}

      <PropertiesEditor
        propertiesSchema={{
          children: { type: 'foo', defaultValue: 'foo' },
          variant: { type: 'foo', defaultValue: 'foo' },
        }}
        properties={properties}
        onPropertiesChange={setProperties}
      />
    </div>
  )
}
