import { PropsWithChildren } from 'react'
import { Separator } from '../ui/separator'

export default function Footer({ children }: PropsWithChildren) {
  return (
    <footer className="">
      <Separator className="w-full" />
      <div className="container py-10">{children}</div>
    </footer>
  )
}
