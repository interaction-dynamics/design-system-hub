import { Property } from '@/entities/property'
import { useEffect, useMemo, useState } from 'react'
import { PropertiesValues } from '../components/component-renderer/types/properties-values'
import { Component } from '@/entities/component'

const findDefaultValue = (property: Property) => {
  if (property.type.includes('() => void')) {
    return { type: 'callback' }
  }
  switch (property.type) {
    case 'string':
      return 'foo'
    case 'number':
      return 0
    case 'boolean':
      return false
    case 'React.ReactNode':
      return 'foo'
    default:
      return null
  }
}

function buildPropertiesValues(properties: Property[]): PropertiesValues {
  return properties.reduce(
    (acc, property) => ({
      ...acc,
      [property.name]: findDefaultValue(property),
    }),
    {}
  )
}

export function useProperties(
  properties: Property[]
): [PropertiesValues, React.Dispatch<React.SetStateAction<PropertiesValues>>] {
  const defaultPropertiesValues = useMemo(() => {
    return buildPropertiesValues(properties)
  }, [properties])

  const [propertiesValues, setPropertiesValues] = useState(
    defaultPropertiesValues
  )

  useEffect(() => {
    setPropertiesValues(defaultPropertiesValues)
  }, [defaultPropertiesValues])

  return [propertiesValues, setPropertiesValues]
}
