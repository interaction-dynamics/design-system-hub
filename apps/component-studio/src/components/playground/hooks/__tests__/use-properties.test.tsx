import { buildProperty } from '@/entities/__mocks__/build-property'
import { useProperties } from '../use-properties'
import { renderHook } from '@testing-library/react'

describe('useProperties', () => {
  it('should return an object with default values for each property for string', () => {
    const property = buildProperty({ name: 'foo', type: 'string' })

    const result = renderHook(() => useProperties([property])).result.current

    expect(result).toEqual({ foo: 'foo' })
  })

  it('should return an object with default values for each property for ReactNode', () => {
    const property = buildProperty({ name: 'foo', type: 'React.ReactNode' })

    const result = renderHook(() => useProperties([property])).result.current

    expect(result).toEqual({ foo: 'foo' })
  })

  it('should return an object with default values for each property for number', () => {
    const property = buildProperty({ name: 'foo', type: 'number' })

    const result = renderHook(() => useProperties([property])).result.current

    expect(result).toEqual({ foo: 0 })
  })

  it('should return an object with default values for each property for boolean', () => {
    const property = buildProperty({ name: 'foo', type: 'boolean' })

    const result = renderHook(() => useProperties([property])).result.current

    expect(result).toEqual({ foo: false })
  })

  it('should return an object with default values for each property for not implemented type', () => {
    const property = buildProperty({ name: 'foo', type: 'bar' })

    const result = renderHook(() => useProperties([property])).result.current

    expect(result).toEqual({ foo: null })
  })
})
