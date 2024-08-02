import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { getStyles } from '@/adapters/data-access/styles'
import Main from '@/components/organisms/main'
import { SpacingStyle } from '@/domain/entities/style'
import { notFound } from 'next/navigation'
import { byAlphabeticalOrder } from '../_utils/sort'
import Typography from '@/components/atoms/typography'
import { PageNavigation } from '@/components/organisms/page-navigation'
import RightSideBar from '@/components/organisms/right-sidebar'

export interface PageProps {
  params: any
}

export default async function SpacingPage({ params }: PageProps) {
  const { designSystemSlug, componentSlug } = params

  const designSystem = await findDesignSystemBySlug(designSystemSlug)
  if (!designSystem) notFound()

  const styles = (
    await getStyles<SpacingStyle>(designSystem.id, 'spacing')
  ).sort(byAlphabeticalOrder)

  const links = styles.map((style) => ({
    name: style.name,
    slug: style.name,
  }))

  return (
    <Main
      title="Spacing"
      description="A spacing system simplifies the creation of page layouts and UI."
      rightSideBar={
        <RightSideBar>
          <PageNavigation links={links} />
        </RightSideBar>
      }
    >
      <div>
        {styles.map((style) => (
          <>
            <Typography key={style.id} variant="h2">
              {style.name}
            </Typography>
            <Typography variant="p" className="mt-2 ">
              value: {style.metadata.spacing}
            </Typography>
          </>
        ))}
      </div>
    </Main>
  )
}
