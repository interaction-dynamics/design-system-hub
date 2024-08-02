import { notFound } from 'next/navigation'
import Main from '@/components/organisms/main'
import ComponentLinks from './_components/component-links'
import Typography from '@/components/atoms/typography'
import RightSideBar from '@/components/organisms/right-sidebar'
import { getProvider } from '@/adapters/providers'
import { getDescription } from '@/domain/use-cases/ui-merge-providers'
import ComponentViewer from './_components/component-viewer'
import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findComponent } from '@/adapters/data-access/components'
import { PropertiesTable } from './_components/properties-table'
import { ComponentFlags } from './_components/component-flags'
import { ComponentDescription } from './_components/component-description'
import { PageNavigation } from '@/components/organisms/page-navigation'

export interface ComponentPageProps {
  params: any
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { designSystemSlug, componentSlug } = params

  const designSystem = await findDesignSystemBySlug(designSystemSlug)
  if (!designSystem) notFound()

  const component = await findComponent(designSystem, componentSlug)

  if (!component) notFound()

  const links = [
    ...(component.variants.length > 0
      ? [
          {
            name: 'Variants',
            slug: 'variants',
            links: component.variants.map((v) => ({
              name: v.name,
              slug: v.slug,
            })),
          },
        ]
      : []),
    {
      name: 'Props',
      slug: 'props',
    },
  ]

  return (
    <Main
      pageSlug={componentSlug}
      title={component.name}
      description={<ComponentDescription component={component} />}
      rightSideBar={
        <RightSideBar>
          <PageNavigation links={links} />
        </RightSideBar>
      }
      flags={<ComponentFlags component={component} />}
    >
      <ComponentLinks component={component} designSystem={designSystem} />
      <ComponentViewer component={component} />
      {component.variants.length > 0 && (
        <div>
          <Typography variant="h2" id="variants">
            Variants
          </Typography>
          {component.variants.map((variant) => (
            <div key={variant.slug}>
              <Typography variant="h3" id={variant.slug}>
                {variant.name}
              </Typography>
              <Typography variant="p">
                {getDescription({ component: variant, getProvider })}
              </Typography>
              <div className="mt-3 pb-3">
                <ComponentLinks
                  component={variant}
                  designSystem={designSystem}
                />
              </div>
              <ComponentViewer component={variant} />
            </div>
          ))}
        </div>
      )}
      <div>
        <Typography variant="h2" id="props">
          Props
        </Typography>
        <PropertiesTable component={component} />
      </div>
    </Main>
  )
}
