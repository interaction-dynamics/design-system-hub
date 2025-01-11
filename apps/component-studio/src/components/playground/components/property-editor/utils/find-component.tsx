import { PropertyEditorInput } from '../components/property-editor-input'
import { PropertyEditorNotImplemented } from '../components/property-editor-not-implemented'
import { PropertyEditorReactNode } from '../components/property-editor-react-node'

export function findComponent(type: string) {
  // if (type.includes('() => void')) {
  //   return PropertyEditorVoidFunction
  // }

  if (type === 'string' || type === 'number') {
    return PropertyEditorInput
  }

  if (type === 'React.ReactNode') {
    return PropertyEditorReactNode
  }

  return PropertyEditorNotImplemented
}
