'use client'
import { Component } from '@/entities/component'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { useProperties } from './hooks/use-properties'
import { useEffect, useMemo, useState } from 'react'
import { PropertyEditor } from './components/property-editor'
import { ComponentRenderer } from './components/component-renderer'

export interface PlaygroundProps {
  component: Component
}

export function Playground({ component }: PlaygroundProps) {
  const defaultProperties = useProperties(component.properties)
  const [properties, setProperties] = useState(defaultProperties)

  useEffect(() => {
    setProperties(defaultProperties)
  }, [component.properties])

  return (
    <>
      <ResizablePanel>
        <ComponentRenderer component={component} properties={properties} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={20} maxSize={30} minSize={10}>
        <div className='flex flex-col gap-6'>
          {component.properties.map(property => (
            <PropertyEditor
              type={property.type}
              key={property.name}
              deprecated={property.deprecated}
              name={property.name}
              defaultValue={property.defaultValue}
              value={properties[property.name]}
              description={property.description ?? ''}
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
