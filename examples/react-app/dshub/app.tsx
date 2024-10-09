import { ComponentViewer } from './component-viewer'
import { components } from './components.json'

const allComponentContainers = {
  Button: async () => await import('../src/libs/atoms/button'),
}

export function App() {
  return (
    <div>
      <h1>DesignSystemHub</h1>
      <ul>
        {components.map(component => (
          <li key={component.path}>{component.name}</li>
        ))}
      </ul>
      <ComponentViewer
        component={components[0]}
        containers={allComponentContainers}
      />
    </div>
  )
}
