import { Toolbar } from '@/components/toolbar'

import { components } from '@/dshub'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Playground } from '@/components/playground'
import { Component } from '@/entities/component'
import { useMemo } from 'react'
import { ComponentSidebar } from '@/components/components-sidebar'

interface StudioPageProps {
  params: { selectedComponent?: string[] }
}

const isSelectedComponent =
  (
    selectedComponentName: string | null,
    selectedComponentPath: string | null
  ) =>
  (component: Component) =>
    component.name === selectedComponentName &&
    component.path === selectedComponentPath

const isSelectedDefaultComponent =
  (defaultComponent: Component) => (component: Component) =>
    component.name === defaultComponent.name &&
    component.path === defaultComponent.path

export default async function StudioPage({ params }: StudioPageProps) {
  const [selectedComponentName, ...selectedComponentPaths] =
    (await params).selectedComponent || []

  const isSelected =
    selectedComponentPaths.length > 0
      ? isSelectedComponent(
          selectedComponentName,
          selectedComponentPaths.join('/')
        )
      : isSelectedDefaultComponent(components[0])

  const selectedComponent = components.find((c: Component) => isSelected(c))

  return (
    <div className='h-screen bg-background flex flex-col'>
      <Toolbar>Component Studio</Toolbar>
      <div className='flex-1'>
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel defaultSize={10} maxSize={30} minSize={10}>
            <ComponentSidebar
              components={components}
              buildUrl={component =>
                `/studio/${component.name}/${component.path}`
              }
              isSelectedComponent={isSelected}
            />
          </ResizablePanel>
          <ResizableHandle />
          {selectedComponent && <Playground component={selectedComponent} />}
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
