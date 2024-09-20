import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {}

export function ComponentViewerContainer({ children }: Props) {
  return (
    <div className=" dark:bg-black bg-white  dark:bg-grid-small-white/[0.5] bg-grid-small-black/[0.5] min-h-20 p-4  relative flex items-center justify-center">
      {children}
    </div>
  )
}
