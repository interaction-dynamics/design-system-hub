import { Component } from '@/entities/component'
import { useMemo } from 'react'
import { PropertiesValues } from '../types/properties-values'

const HOST = 'http://localhost:5555'

export function useGenerateIframeUrl(
  component: Component,
  properties: PropertiesValues
) {
  const url = useMemo(() => {
    const path = `${HOST}/${component.path}`
    const url = new URL(path)
    url.searchParams.set('props', JSON.stringify(properties))

    return url.toString()
  }, [properties, component.path])

  return url
}
