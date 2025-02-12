import { StrictMode, useEffect, useMemo, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { ComponentViewer } from './component-viewer'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DesignSystem } from '@design-system-hub/entities'
import { socket } from './socket'

const buildRouter = (
  designSystem: DesignSystem,
  allComponentImports: Record<string, () => Promise<Record<string, unknown>>>,
) =>
  createBrowserRouter(
    designSystem.components.map(component => ({
      path: `/${component.path}/${component.name}`,
      element: (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <ComponentViewer
            component={component}
            container={allComponentImports[component.path]}
          />
        </ErrorBoundary>
      ),
    })),
  )

export function App() {
  const [designSystem, setDesignSystem] = useState<DesignSystem | null>(null)
  const [imports, setImports] = useState<any>(null)

  useEffect(() => {
    const onDesignSystemChange = (newDesignSystem: DesignSystem) => {
      setDesignSystem(newDesignSystem)
    }

    socket.on('design-system', onDesignSystemChange)

    import('./components-imports').then(module => {
      setImports(module.default)
    })

    return () => {
      socket.off('design-system', onDesignSystemChange)
    }
  }, [])

  const router = useMemo(
    () => (designSystem && imports ? buildRouter(designSystem, imports) : null),
    [designSystem, imports],
  )

  if (!router) return <></>

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}
