import { PropsWithChildren } from 'react'
import Layout3Columns from '../../../../components/organisms/layout-3-columns'
import getDesignSystem from '../../../../providers/figma/features/files/getDesignSystem'
import LeftSideBar from '../../../../components/organisms/left-sidebar'
import PartialComponent from '@/features/component/types/PartialComponent'

interface ComponentPageProps extends PropsWithChildren {
  params: any
}

export default async function ComponentsLayout({
  params,
  children,
}: ComponentPageProps) {
  const { designSystemSlug, componentSlug } = params

  const designSystem = await getDesignSystem(params.designSystemSlug)

  const links =
    designSystem.components?.map((component) => {
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
