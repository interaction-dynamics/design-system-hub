import { PropertyEditorInput } from '../components/property-editor-input'
import { PropertyEditorNotImplemented } from '../components/property-editor-not-implemented'
import { PropertyEditorReactNode } from '../components/property-editor-react-node'
import { PropertyEditorCallback } from '../components/property-editor-callback'

export function findPropertyEditor(type: string, name: string) {
  if (type.match(/\(.*\) \=\> void/) && name.startsWith('on')) {
    return PropertyEditorCallback
  }

  if (type === 'string' || type === 'number') {
    return PropertyEditorInput
  }

  if (type === 'React.ReactNode') {
    return PropertyEditorReactNode
  }

  return PropertyEditorNotImplemented
}
