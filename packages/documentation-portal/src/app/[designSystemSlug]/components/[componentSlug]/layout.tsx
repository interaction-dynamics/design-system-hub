import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'
import Layout3Columns from '../../../../components/organisms/layout-3-columns'
import LeftSideBar from '../../../../components/organisms/left-sidebar'
import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findPartialComponents } from '@/adapters/data-access/components'

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
      }
    }) ?? []

  return (
    <Layout3Columns
      slug={designSystemSlug}
      section="components"
      leftSidebar={<LeftSideBar links={links} />}
      rightSidebar={<>ffsdfds</>}
    >
      {children}
    </Layout3Columns>
  )
}
