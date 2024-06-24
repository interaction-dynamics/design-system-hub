import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { getStyles } from '@/adapters/data-access/styles'
import Typography from '@/components/atoms/typography'
import Main from '@/components/organisms/main'
import { notFound } from 'next/navigation'
import { useGroupByColor } from './_utils/useGroupByColor'
import { ColorStyle, Style } from '@/domain/entities/style'
import { useConvertToHex } from './_utils/useConvertToHex'
import { PageNavigation } from '@/components/organisms/page-navigation'
import generateSlug from '@/lib/generate-slug'

export interface PageProps {
  params: any
}

export default async function ColorPage({ params }: PageProps) {
  const { designSystemSlug, componentSlug } = params

  const designSystem = await findDesignSystemBySlug(designSystemSlug)
  if (!designSystem) notFound()

  const styles: Array<ColorStyle> = await getStyles<ColorStyle>(
    designSystem.id,
    'color'
  )

  const colorsByGroup = useGroupByColor(styles)

  const convertToHex = useConvertToHex()

  const links = [
    {
      name: 'Palette',
      slug: 'palette',
      links: Object.keys(colorsByGroup).map((group) => ({
        name: group,
        slug: generateSlug(group),
      })),
    },
  ]

  return (
    <Main
      title="Color"
      description="Color distinguishes our brand and reinforces consistent experiences across products."
      rightSideBar={<PageNavigation links={links} />}
    >
      <Typography variant="h2" id="palette">
        Palette
      </Typography>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(colorsByGroup).map(([group, colors]) => (
          <div key={group}>
            <Typography variant="h3" id={group}>
              {group}
            </Typography>
            <div className="mt-1 flex flex-col border rounded-md overflow-hidden">
              {colors.map((color: ColorStyle) => (
                <div
                  key={color.id}
                  className="border-b last:bolder-b-0 p-1 px-3 flex items-start justify-between h-16"
                  style={{ backgroundColor: color.metadata.color }}
                >
                  <Typography variant="p" className="mt-2 font-semibold">
                    {color.name}
                  </Typography>
                  <Typography
                    variant="p"
                    className="mt-2 font-semibold select-all"
                  >
                    {convertToHex(color.metadata.color)}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Main>
  )
}
