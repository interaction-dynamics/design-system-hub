import { Component } from '@/entities/component'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export interface ComponentsSidebarProps {
  components: Component[]
  buildUrl: (component: Component) => string
  isSelectedComponent: (component: Component) => boolean
}

export function ComponentSidebar({
  components,
  buildUrl,
  isSelectedComponent,
}: ComponentsSidebarProps) {
  return (
    <div className='m-4 space-y-1'>
      {components.map(component => (
        <Link
          href={buildUrl(component)}
          key={component.name}
          className={`${cn(
            'group flex h-8 w-full justify-between items-center rounded-lg px-2 font-normal text-foreground underline-offset-2 hover:bg-accent hover:text-accent-foreground',
            isSelectedComponent(component)
              ? 'bg-accent text-accent-foreground'
              : ''
          )}`}
        >
          {component.name}
          {/* <div>fdsfds</div> */}
        </Link>
      ))}
    </div>
  )
}
