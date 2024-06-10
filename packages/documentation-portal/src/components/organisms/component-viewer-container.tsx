import { PropsWithChildren } from 'react'
import SvgGrid from '@/components/atoms/svg-grid'

interface Props extends PropsWithChildren {}

export function ComponentViewerContainer({ children }: Props) {
  return (
    <div className="relative min-h-20 p-4 flex items-center justify-center">
      <SvgGrid />
      {children}
    </div>
  )
}
