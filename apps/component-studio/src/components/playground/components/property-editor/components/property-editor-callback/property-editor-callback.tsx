import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'
import { PropertyEditorGenericProps } from '../property-editor-generic'

interface PropertyEditorCallbackProps
  extends PropertyEditorGenericProps<'callback'> {}

interface MessageEvent {
  data: {
    type: string
    source: string
  }
}

export function PropertyEditorCallback(props: PropertyEditorCallbackProps) {
  const { toast } = useToast()

  useEffect(() => {
    const callback = (event: MessageEvent) => {
      if (event.data.type === 'callback' && props.name === event.data.source) {
        toast({ title: `${event.data.source} triggered` })
      }
    }

    window.addEventListener('message', callback)

    return () => window.removeEventListener('message', callback)
  }, [])

  return (
    <div className='text-muted-foreground text-sm'>
      A notification will be sent when this callback is triggered
    </div>
  )
}
