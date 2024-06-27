import { PropsWithChildren } from 'react'
import { Separator } from '@/components/ui/separator'

export default function Header({ children }: PropsWithChildren) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="flex items-center h-14 py-2">{children}</div>
      <Separator />
    </header>
  )
}
