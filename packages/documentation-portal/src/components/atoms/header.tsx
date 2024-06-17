import { PropsWithChildren } from 'react'
import { Separator } from '@/components/ui/separator'

export default function Header({ children }: PropsWithChildren) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="flex h-14 py-4 px-10 justify-between items-center">
        {children}
      </div>
      <Separator />
    </header>
  )
}
