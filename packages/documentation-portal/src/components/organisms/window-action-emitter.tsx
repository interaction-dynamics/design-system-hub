'use client'
import { useEffect } from 'react'

import { sendMessage } from '@/lib/tabs-messages'

export function WindowActionEmitter() {
  const eventName = 'connect-figma-success'

  useEffect(() => {
    console.log('eventName', eventName)
    sendMessage(eventName)
  }, [eventName])

  return <div className="fixed inset-0 bg-backgroun z-50" />
}
