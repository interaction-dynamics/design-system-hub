import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { LayoutWithLeftSidebar } from '@/components/organisms/layout-with-left-sidebar'
import LeftSideBar from '@/components/organisms/left-sidebar'

interface FoundationsPageProps extends PropsWithChildren {
  params: any
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
  {
    label: 'Border',
    href: 'border',
  },
  {
    label: 'Icons',
    href: 'icons',
  },
]

export default async function ComponentsLayout({
  params,
  children,
}: FoundationsPageProps) {
  const links =
    foundations.map((foundation) => {
      return {
        label: foundation.label,
        href: `/${params.designSystemSlug}/foundations/${foundation.href}`,
        active: foundation.href === params.foundationSlug,
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
