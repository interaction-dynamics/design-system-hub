import { PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'

import { LayoutWithLeftSidebar } from '@/components/organisms/layout-with-left-sidebar'
import LeftSideBar from '@/components/organisms/left-sidebar'

interface FoundationsPageProps extends PropsWithChildren {
  params: any
  slug: string
}

const foundations = [
  {
    label: 'Color',
    href: 'color',
  },
  {
    label: 'Typography',
    href: 'typography',
  },
  {
    label: 'Spacing',
    href: 'spacing',
  },
  {
    label: 'Elevation',
    href: 'elevation',
  },
  // {
  //   label: 'Border',
  //   href: 'border',
  // },
  // {
  //   label: 'Icons',
  //   href: 'icons',
  // },
]

export async function FoundationLayout({
  params,
  children,
  slug,
}: FoundationsPageProps) {
  const links =
    foundations.map((foundation) => {
      return {
        label: foundation.label,
        href: `/${params.designSystemSlug}/styles/${foundation.href}`,
        active: slug === foundation.href,
      }
    }) ?? []

  return (
    <LayoutWithLeftSidebar
      slug={params.designSystemSlug}
      section="foundations"
      leftSidebar={<LeftSideBar links={links} />}
    >
      {children}
    </LayoutWithLeftSidebar>
  )
}
