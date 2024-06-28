import { WindowActionEmitter } from '@/components/organisms/window-action-emitter'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense>
      <WindowActionEmitter />
    </Suspense>
  )
}
