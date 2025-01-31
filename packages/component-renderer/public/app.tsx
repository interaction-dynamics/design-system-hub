import { StrictMode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { ComponentViewer } from './component-viewer'
import { components } from './components.json'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { allComponentContainers } from './allComponents'

const router = createBrowserRouter(
  components.map(component => ({
    path: `/${component.path}`,
    element: (
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ComponentViewer
          component={component}
          containers={allComponentContainers}
        />
      </ErrorBoundary>
    ),
  }))
)

export function App() {
  return (
    <StrictMode>
      <RouterProvider router={router}>foo</RouterProvider>
    </StrictMode>
  )
}
