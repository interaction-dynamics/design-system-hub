import { notFound } from 'next/navigation'
import { PropsWithChildren, Suspense } from 'react'
import { LayoutWithLeftSidebar } from '@/components/organisms/layout-with-left-sidebar'
import LeftSideBar from '@/components/organisms/left-sidebar'
import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findPartialComponents } from '@/adapters/data-access/components'
import { NavigationComponentFlags } from './[componentSlug]/_components/navigation-component-flags'
import { findAllPages } from '@/adapters/data-access/page'

interface ComponentPageProps extends PropsWithChildren {
  params: any
}

export default async function PrinciplesLayout({
  params,
  children,
}: ComponentPageProps) {
  const { designSystemSlug } = params

  const designSystem = await findDesignSystemBySlug(params.designSystemSlug)

  if (!designSystem) notFound()
  const pages = await findAllPages(designSystem.id)

  const links =
    pages.map((page) => {
      return {
        label: page.title,
        href: `/${designSystem.slug}/principles/${page.slug}`,
        metadata: {
          designSystem,
          pageSlug: page.slug,
        },
      }
    }) ?? []

  return (
    <LayoutWithLeftSidebar
      slug={designSystemSlug}
      section="principles"
      leftSidebar={<LeftSideBar links={links} />}
    >
      {children}
    </LayoutWithLeftSidebar>
  )
}
