import { notFound } from 'next/navigation'
import Main from '../../../../components/organisms/main'
import ComponentLinks from '@/app/[designSystemSlug]/components/[componentSlug]/_components/component-links'
import Typography from '@/components/atoms/typography'
import RightSideBar from '@/components/organisms/right-sidebar'
import { getProvider } from '@/adapters/providers'
import { getDescription } from '@/domain/use-cases/ui-merge-providers'
import ComponentViewer from './_components/component-viewer'
import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findComponent } from '@/adapters/data-access/components'
import { NavigationInFile } from './_components/navigation-in-file'
import { PropertiesTable } from './_components/properties-table'

export interface ComponentPageProps {
  params: any
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { designSystemSlug, componentSlug } = params

  const designSystem = await findDesignSystemBySlug(designSystemSlug)
  if (!designSystem) notFound()

  const component = await findComponent(designSystem, componentSlug)

  if (!component) notFound()

  return (
    <Main
      pageSlug={componentSlug}
      title={component.name}
      description={getDescription({ component, getProvider })}
      rightSideBar={
        <RightSideBar>
          <NavigationInFile component={component} />
        </RightSideBar>
      }
    >
      <div className="mt-10 pb-3">
        <ComponentLinks component={component} />
      </div>
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
                <ComponentLinks component={variant} />
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
