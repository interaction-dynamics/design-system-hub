'use client'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  // { title: 'Getting Started', href: 'getting-started' },
  { title: 'Principles', href: 'principles' },
  { title: 'Foundations', href: 'foundations' },
  { title: 'Components', href: 'components' },
]

export interface NavigationProps {
  designSystemSlug: string
}

export default function Navigation({ designSystemSlug }: NavigationProps) {
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigation.map(({ title, href }) => (
          <NavigationMenuItem key={href}>
            <Link href={`/${designSystemSlug}/${href}`} legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={pathname.includes(href)}
              >
                {title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
