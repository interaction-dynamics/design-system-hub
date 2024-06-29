'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { sendMessage } from '@/lib/tabs-messages'

export function WindowActionEmitter() {
  const searchParams = useSearchParams()

  const eventName = searchParams.get('state') ?? ''

  useEffect(() => {
    sendMessage(eventName)
    window.close()
  }, [eventName])

  return <div className="fixed inset-0 bg-background" />
}
