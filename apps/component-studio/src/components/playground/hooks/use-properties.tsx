import { Property } from '@/entities/property'

const findDefaultValue = (property: Property) => {
  if (property.type.includes('() => void')) {
    return { type: 'callback' }
  }
  switch (property.type) {
    case 'string':
      return ''
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

export function useProperties(properties: Property[]): Record<string, any> {
  return properties.reduce(
    (acc, property) => ({
      ...acc,
      [property.name]: findDefaultValue(property),
    }),
    {}
  )
}
