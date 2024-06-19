import { PropsWithChildren } from 'react'
import { notFound } from 'next/navigation'
import Header from '@/components/atoms/header'
import Footer from '@/components/atoms/footer'
import Typography from '@/components/atoms/typography'
import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'

export interface DesignSystemLayoutProps extends PropsWithChildren {
  params: any
}

export default async function DesignSystemLayout({
  children,
  params,
}: DesignSystemLayoutProps) {
  const designSystem = await findDesignSystemBySlug(params.designSystemSlug)

  if (!designSystem) {
    notFound()
  }

  return (
    <div className="relative min-h-screen flex flex-col scroll-smooth">
      <Header>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href={`/${designSystem.slug}`}>
              <h1 className="text-lg font-bold">{designSystem.name}</h1>
            </a>
            {/* <Navigation designSystemSlug={designSystemSlug} /> */}
          </div>
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
