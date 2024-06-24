import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { LayoutWithLeftSidebar } from '@/components/organisms/layout-with-left-sidebar'
import LeftSideBar from '@/components/organisms/left-sidebar'
import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findPartialComponents } from '@/adapters/data-access/components'

interface ComponentPageProps extends PropsWithChildren {
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
}: ComponentPageProps) {
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
