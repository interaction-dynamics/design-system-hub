import { notFound } from 'next/navigation'
import Image from 'next/image'
import getComponent from '@/providers/figma/features/components/getComponent'
import getDesignSystem from '@/providers/figma/features/files/getDesignSystem'
import Main from '../../../../components/organisms/main'
import ComponentLinks from '@/features/component/components/component-links'
import { getDescription } from '@/providers'
import Typography from '@/components/atoms/typography'
import DemoViewer from '@/features/component/components/demo-viewer'
import RightSideBar from '@/components/organisms/right-sidebar'

export interface ComponentPageProps {
  params: any
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { designSystemSlug, componentSlug } = params

  const designSystem = await getDesignSystem(designSystemSlug)

  const partialComponent = designSystem.components?.find(
    (c) => c.slug === componentSlug
  )

  if (!partialComponent) {
    notFound()
  }

  const component = await getComponent(partialComponent)

  if (!component) {
    notFound()
  }

  return (
    <Main
      pageSlug={componentSlug}
      title={component.name}
      description={getDescription(component)}
      rightSideBar={
        <RightSideBar>
          {component.variants.length > 0 && (
            <p className="font-medium text-primary">On This Page</p>
          )}
          <ul className="m-0 list-none text-muted">
            {component.variants.length > 0 && (
              <>
                <li className="mt-0 pt-2">
                  <a
                    href="#variants"
                    className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
                  >
                    Variants
                  </a>
                </li>
                <ul className="m-0 list-none pl-4">
                  {component.variants.map((variant) => (
                    <li key={variant.slug} className="mt-0 pt-2">
                      <a
                        href={`#${variant.slug}`}
                        className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
                      >
                        {variant.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </ul>
        </RightSideBar>
      }
    >
      <div className="mt-10 pb-3">
        <ComponentLinks component={component} />
      </div>
      <DemoViewer component={component} />
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
              <Typography variant="p">{getDescription(variant)}</Typography>
              <div className="mt-3 pb-3">
                <ComponentLinks component={variant} />
              </div>
              <DemoViewer component={variant} />
            </div>
          ))}
        </div>
      )}
    </Main>
  )
}
