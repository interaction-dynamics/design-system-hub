import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { getStyles } from '@/adapters/data-access/styles'
import Main from '@/components/organisms/main'
import { ElevationStyle } from '@/domain/entities/style'
import { notFound } from 'next/navigation'
import { byAlphabeticalOrder } from '../_utils/sort'
import { PageNavigation } from '@/components/organisms/page-navigation'
import { Fragment } from 'react'
import Typography from '@/components/atoms/typography'
import { generateSlug } from '@/lib/generate-slug'
import { ElevationViewer } from './_component/elevation-viewer'
import RightSideBar from '@/components/organisms/right-sidebar'

export interface PageProps {
  params: any
}

export default async function ElevationPage({ params }: PageProps) {
  const { designSystemSlug, componentSlug } = params

  const designSystem = await findDesignSystemBySlug(designSystemSlug)
  if (!designSystem) notFound()

  const styles = (
    await getStyles<ElevationStyle>(designSystem.id, 'elevation')
  ).sort(byAlphabeticalOrder)

  const links = styles.map((style) => ({
    name: style.name,
    slug: generateSlug(style.name),
  }))

  return (
    <Main
      title="Elevation"
      description="Elevations are layered surfaces that form the foundation of UI."
      rightSideBar={
        <RightSideBar>
          <PageNavigation links={links} />
        </RightSideBar>
      }
    >
      {styles.map((style, index) => (
        <Fragment key={style.name}>
          <Typography variant="h2" id={links[index].slug}>
            {style.name}
          </Typography>
          <div>
            <ElevationViewer style={style} />
          </div>
        </Fragment>
      ))}
    </Main>
  )
}
