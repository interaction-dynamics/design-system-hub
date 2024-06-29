import { useEffect } from 'react'

const broadcastChannel = new BroadcastChannel('test_channel')

export const sendMessage = (message: string) => {
  broadcastChannel.postMessage(message)
  console.log('broadcastChannel', message)
}

export const useMessages = (
  eventName: string,
  callback: (message: MessageEvent) => void
) => {
  useEffect(() => {
    console.log('useMessages', eventName)
    broadcastChannel.onmessage = (event) => {
      console.log('broadcastChannel.onmessage', event)
      if (eventName === event.data) {
        callback(event)
      }
    }
  }, [eventName, callback])
}
