import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { LayoutWithLeftSidebar } from '@/components/organisms/layout-with-left-sidebar'
import LeftSideBar from '@/components/organisms/left-sidebar'
import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findPartialComponents } from '@/adapters/data-access/components'
import { metadata } from '@/app/layout'
import { NavigationComponentFlags } from './_components/navigation-component-flags'

interface ComponentPageProps extends PropsWithChildren {
  params: any
}

export default async function ComponentsLayout({
  params,
  children,
}: ComponentPageProps) {
  const { designSystemSlug, componentSlug } = params

  const designSystem = await findDesignSystemBySlug(params.designSystemSlug)

  if (!designSystem) notFound()
  const partialComponents = await findPartialComponents(designSystem)

  const links =
    partialComponents.map((component) => {
      return {
        label: component.name,
        href: `/${designSystem.slug}/components/${component.slug}`,
        active: component.slug === componentSlug,
        metadata: {
          designSystem,
          componentSlug: component.slug,
        },
      }
    }) ?? []

  return (
    <LayoutWithLeftSidebar
      slug={designSystemSlug}
      section="components"
      leftSidebar={
        <LeftSideBar links={links} flags={NavigationComponentFlags} />
      }
    >
      {children}
    </LayoutWithLeftSidebar>
  )
}
