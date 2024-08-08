import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { getStyles } from '@/adapters/data-access/styles'
import Typography from '@/components/atoms/typography'
import Main from '@/components/organisms/main'
import { notFound } from 'next/navigation'
import { useGroupByColor } from './_utils/useGroupByColor'
import { ColorStyle, Style } from '@/domain/entities/style'
import { useConvertToHex } from './_utils/useConvertToHex'
import { PageNavigation } from '@/components/organisms/page-navigation'
import { generateSlug } from '@/lib/generate-slug'
import RightSideBar from '@/components/organisms/right-sidebar'

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
      links: Object.keys(colorsByGroup).sort().map((group) => ({
        name: group,
        slug: generateSlug(group),
      })),
    },
  ]

  return (
    <Main
      title="Color"
      description="Color distinguishes our brand and reinforces consistent experiences across products."
      rightSideBar={
        <RightSideBar>
          <PageNavigation links={links} />
        </RightSideBar>
      }
    >
      <Typography variant="h2" id="palette">
        Palette
      </Typography>
      <div className="mt-10" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-2 gap-y-8 sm:grid-cols-1">
        {Object.entries(colorsByGroup)
          .sort()
          .map(([group, colors]) => (
            <div className="2xl:contents" id={group} key={group}>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-200 2xl:col-end-1 2xl:pt-2.5 select-all">
                {group}
              </div>
              <div className="grid mt-3 grid-cols-1 sm:grid-cols-11 gap-y-3 gap-x-2 sm:mt-2 2xl:mt-0">
                {colors.map((color: ColorStyle) => (
                  <div className="relative flex" key={color.name}>
                    <div className="flex items-center gap-x-3 w-full sm:block sm:space-y-1.5">
                      <div
                        className="h-10 w-10 rounded dark:ring-1 dark:ring-inset dark:ring-white/10 sm:w-full"
                        style={{ backgroundColor: color.metadata.color }}
                      />
                      <div className="px-0.5">
                        <div className="w-6 font-medium text-xs text-slate-900 2xl:w-full dark:text-white">
                          {color.name.split('/')[1]}
                        </div>
                        <div className="text-slate-500 text-xs font-mono lowercase dark:text-slate-400 sm:text-[0.625rem] md:text-xs lg:text-[0.625rem] 2xl:text-xs select-all">
                          {convertToHex(color.metadata.color).slice(0, 7)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </Main>
  )
}
