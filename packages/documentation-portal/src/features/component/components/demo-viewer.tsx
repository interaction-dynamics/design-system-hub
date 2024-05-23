import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import Component, { ComponentVariant } from '../types/Component'
import { getViewers } from '@/providers'

interface DemoViewerProps {
  component: Component | ComponentVariant
}

function DemoViewer({ component }: DemoViewerProps) {
  const [Viewer] = getViewers(component)

  console.log('DemoViewer.component', component)

  return (
    <div className="relative w-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md border overflow-hidden">
      <Viewer component={component} />
    </div>
  )

  // return (
  //   <Tabs defaultValue="account" className="w-[400px]">
  //     <TabsList>
  //       <TabsTrigger value="account">Account</TabsTrigger>
  //       <TabsTrigger value="password">Password</TabsTrigger>
  //     </TabsList>
  //     <TabsContent value="account">
  //       Make changes to your account here.
  //     </TabsContent>
  //     <TabsContent value="password">Change your password here.</TabsContent>
  //   </Tabs>
  // )
}

DemoViewer.label = 'Figma'

export default DemoViewer
