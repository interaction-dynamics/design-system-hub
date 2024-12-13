import {
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Toolbar } from '@/components/Toolbar'
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'
import { Playground } from './components/Playground'
import { components } from '../dshub.json'
import { useState } from 'react'

const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
]

export default function App() {
  const [component, setComponent] = useState(components[0])

  return (
    <SidebarProvider className="h-screen dark bg-background flex flex-col">
      <Toolbar>dsadsa</Toolbar>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} maxSize={30}>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Components</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {components.map(c => (
                    <SidebarMenuItem key={c.path}>
                      <SidebarMenuButton onClick={() => setComponent(c)}>
                        {c.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <Playground component={component} />
      </ResizablePanelGroup>
      <Toaster />
    </SidebarProvider>
  )
}
