import { StrictMode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { ComponentViewer } from './component-viewer'
import { components } from './components.json'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const allComponentContainers = {
  Button: async () => await import('../src/libs/atoms/button'),
  App: async () => await import('../src/app'),
  ButtonLegacy: async () => await import('../src/libs/atoms/button-legacy'),
  Input: async () => await import('../src/libs/atoms/input'),
  Card: async () => await import('../src/libs/molecules/card'),
  Icon: async () => await import('../src/libs/molecules/icon'),
}

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
      <RouterProvider router={router} />
    </StrictMode>
  )
}
