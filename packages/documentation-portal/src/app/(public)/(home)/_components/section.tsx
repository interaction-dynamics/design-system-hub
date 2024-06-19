import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

interface SectionProps extends PropsWithChildren {
  className?: string
}

export function Section({ children, className }: SectionProps) {
  return (
    <section className={cn('max-w-xl m-auto p-1', className)}>
      {children}
    </section>
  )
}
