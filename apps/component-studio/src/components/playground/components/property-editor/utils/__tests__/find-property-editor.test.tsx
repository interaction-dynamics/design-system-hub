import { buildComponent } from '@/entities/__mocks__/build-component'
import { findPropertyEditor } from '../find-property-editor'
import { PropertyEditorInput } from '../../components/property-editor-input'
import { PropertyEditorNotImplemented } from '../../components/property-editor-not-implemented'
import { PropertyEditorReactNode } from '../../components/property-editor-react-node'

describe('findPropertyEditor', () => {
  it('should return the input for string', () => {
    expect(findPropertyEditor('string', 'value')).toEqual(PropertyEditorInput)
  })

  it('should return the input for number', () => {
    expect(findPropertyEditor('string', 'value')).toEqual(PropertyEditorInput)
  })

  it('should return the input for React.ReactNode', () => {
    expect(findPropertyEditor('React.ReactNode', 'value')).toEqual(
      PropertyEditorReactNode
    )
  })

  it('should return the not implemented function', () => {
    expect(findPropertyEditor('() => void', 'buildUrl')).toEqual(
      PropertyEditorNotImplemented
    )
  })
})
