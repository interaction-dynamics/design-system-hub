import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface LeftSideBarProps {
  links: {
    label: string
    href: string
    active?: boolean
  }[]
}

export default function LeftSideBar({ links }: LeftSideBarProps) {
  return (
    <aside className="fixed top-14 pt-8 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <div className="grid grid-flow-row auto-rows-max text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            className={cn(
              'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline ',
              link.active ? 'text-foreground' : 'text-muted-foreground'
            )}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  )
}
