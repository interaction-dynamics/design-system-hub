import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { getStyles } from '@/adapters/data-access/styles'
import Typography from '@/components/atoms/typography'
import Main from '@/components/organisms/main'
import { TypographyStyle } from '@/domain/entities/style'
import { notFound } from 'next/navigation'
import { TypographyViewer } from './_components/typography-viewer'
import { PageNavigation } from '@/components/organisms/page-navigation'
import { byAlphabeticalOrder } from '../_utils/sort'
import generateSlug from '@/lib/generate-slug'
import RightSideBar from '@/components/organisms/right-sidebar'

export interface PageProps {
  params: any
}

export default async function TypographyPage({ params }: PageProps) {
  const { designSystemSlug, componentSlug } = params

  const designSystem = await findDesignSystemBySlug(designSystemSlug)
  if (!designSystem) notFound()

  const styles = (
    await getStyles<TypographyStyle>(designSystem.id, 'typography')
  ).sort(byAlphabeticalOrder)

  const links = styles.map((style) => ({
    name: style.name,
    slug: generateSlug(style.name),
  }))

  return (
    <Main
      title="Typography"
      description="Typography is our system of fonts and text styles. It enhances communication, reinforces brand, and guides users' emotions."
      rightSideBar={
        <RightSideBar>
          <PageNavigation links={links} />
        </RightSideBar>
      }
    >
      {styles.map((style, index) => (
        <div key={style.name}>
          <Typography key={style.id} id={links[index].slug} variant="h2">
            {style.name}
          </Typography>
          <TypographyViewer style={style} />
        </div>
      ))}
    </Main>
  )
}
