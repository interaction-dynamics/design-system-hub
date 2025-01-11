import { Property } from '@/entities/property'
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'

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
  const { toast } = useToast()

  useEffect(() => {
    const callback = event => {
      if (event.data.type === 'callback') {
        toast({
          title: `${event.data.source} triggered`,
          // description: 'Click here for more details about the arguments',
        })
      }
    }

    window.addEventListener('message', callback)

    return () => {
      window.removeEventListener('message', callback)
    }
  }, [])

  return properties.reduce(
    (acc, property) => ({
      ...acc,
      [property.name]: findDefaultValue(property),
    }),
    {}
  )
}
