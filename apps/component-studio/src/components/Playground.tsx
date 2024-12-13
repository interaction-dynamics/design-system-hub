import { useEffect, useMemo, useState } from 'react'
import { Component } from '../entities/component'
import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable'
import { PropertyEditor } from './PropertyEditor'
import { useProperties } from '@/hooks/use-properties'

export interface PlaygraoundProps {
  component: Component
}

const HOST = 'http://localhost:5555'

export function Playground({ component }: PlaygraoundProps) {
  const defaultProperties = useProperties(component.properties)
  const [properties, setProperties] = useState(defaultProperties)

  useEffect(() => {
    setProperties(defaultProperties)
  }, [component.properties])

  const url = useMemo(() => {
    const path = `${HOST}/${component.path}`
    const url = new URL(path)
    url.searchParams.set('props', JSON.stringify(properties))

    return url.toString()
  }, [properties, component.path])

  return (
    <>
      <ResizablePanel className="relative">
        <iframe className="h-full w-full" src={url} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={20} maxSize={40}>
        <div className="p-4 flex flex-col gap-6">
          {component.properties.map(property => (
            <PropertyEditor
              type={property.type}
              key={property.name}
              deprecated={property.deprecated}
              name={property.name}
              defaultValue={property.defaultValue}
              value={properties[property.name]}
              description={property.description}
              onChange={(name, value) =>
                setProperties(p => ({ ...p, [name]: value }))
              }
            />
          ))}
        </div>
      </ResizablePanel>
    </>
  )
}
