import { useEffect } from 'react'

const broadcastChannel = new BroadcastChannel('test_channel')

export const sendMessage = (message: string) => {
  broadcastChannel.postMessage(message)
}

export const useMessages = (
  eventName: string,
  callback: (message: MessageEvent) => void
) => {
  useEffect(() => {
    broadcastChannel.onmessage = (event) => {
      if (eventName === event.data) {
        callback(event)
      }
    }
  })
}
