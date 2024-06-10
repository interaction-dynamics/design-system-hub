import { Component } from '@/domain/entities/component'
import { ComponentVariant } from '@/domain/entities/component-variant'
import { getViewers } from '@/domain/use-cases/ui-merge-providers'
import { getProvider } from '@/adapters/providers'
import { ComponentViewerContainer } from '@/components/organisms/component-viewer-container'

interface ComponentViewerProps {
  component: Component | ComponentVariant
}

function ComponentViewer({ component }: ComponentViewerProps) {
  const [Viewer] = getViewers({ component, getProvider })

  return (
    <div className="relative w-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md border overflow-hidden">
      {Viewer ? (
        <Viewer component={component} />
      ) : (
        <ComponentViewerContainer>
          <div className="text-sm font-semibold relative z-20">
            No design found
          </div>
        </ComponentViewerContainer>
      )}
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

export default ComponentViewer
