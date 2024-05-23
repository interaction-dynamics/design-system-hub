import { PropsWithChildren } from 'react'
import { notFound } from 'next/navigation'
import Header from '@/components/atoms/header'
import Footer from '@/components/atoms/footer'
import getDesignSystem from '../../providers/figma/features/files/getDesignSystem'
import Typography from '@/components/atoms/typography'

export interface DesignSystemLayoutProps extends PropsWithChildren {
  params: any
}

export default async function DesignSystemLayout({
  children,
  params,
}: DesignSystemLayoutProps) {
  const designSystem = await getDesignSystem(params.designSystemSlug)

  if (!designSystem || designSystem.slug !== params.designSystemSlug) {
    notFound()
  }

  return (
    <div className="relative min-h-screen flex flex-col scroll-smooth">
      <Header>
        <div className="flex items-center gap-4">
          <a href={`/${designSystem.slug}`}>
            <h1 className="text-lg font-bold">{designSystem.name}</h1>
          </a>
          {/* <Navigation designSystemSlug={designSystemSlug} /> */}
        </div>
      </Header>
      <main className="flex-1">{children}</main>
      <Footer>
        <Typography variant="p">
          Powered by{' '}
          <a
            href="https://github.com/interaction-dynamics/design-system-manager"
            className="underline hover:text-primary"
          >
            DesignSystemManager
          </a>
        </Typography>
      </Footer>
    </div>
  )
}
