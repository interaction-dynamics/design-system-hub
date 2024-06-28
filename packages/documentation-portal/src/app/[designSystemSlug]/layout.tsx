import { PropsWithChildren } from 'react'
import { notFound } from 'next/navigation'
import Header from '@/components/atoms/header'
import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import Navigation from './_components/navigation'
import Footer from '@/components/atoms/footer'
import { UserMenu } from '@/components/organisms/user-menu'

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
        <div className="w-full flex justify-between items-center px-10">
          <div className="flex items-center gap-10">
            <a href={`/${designSystem.slug}`}>
              <h1 className="text-lg font-bold">{designSystem.name}</h1>
            </a>
            <Navigation designSystemSlug={params.designSystemSlug} />
          </div>
          <UserMenu />
        </div>
      </Header>
      <main className="flex-1">{children}</main>
      <Footer className="px-10" />
    </div>
  )
}
