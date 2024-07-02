import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { LayoutWithLeftSidebar } from '@/components/organisms/layout-with-left-sidebar'
import LeftSideBar from '@/components/organisms/left-sidebar'
import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findPartialComponents } from '@/adapters/data-access/components'

interface ComponentPageProps extends PropsWithChildren {
  params: any
}

export default async function SettingsLayout({
  params,
  children,
}: ComponentPageProps) {
  const { designSystemSlug, componentSlug } = params

  const designSystem = await findDesignSystemBySlug(params.designSystemSlug)

  if (!designSystem) notFound()
  const partialComponents = await findPartialComponents(designSystem)

  const links = [
    {
      label: 'General',
      href: `/${designSystem.slug}/settings/general`,
      active: true,
    },
    {
      label: 'Integrations',
      href: `/${designSystem.slug}/settings/integrations`,
    },
  ]

  return (
    <LayoutWithLeftSidebar
      slug={designSystemSlug}
      section="components"
      leftSidebar={
        <LeftSideBar links={links} title={`${designSystem.name} Settings`} />
      }
    >
      {children}
    </LayoutWithLeftSidebar>
  )
}
