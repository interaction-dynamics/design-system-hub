import { PropsWithChildren } from 'react'
import { auth } from '@clerk/nextjs/server'

import { notFound } from 'next/navigation'
import Header from '@/components/atoms/header'
import { findDesignSystemAndOrganizationBySlug } from '@/adapters/data-access/design-systems'
import Navigation from './_components/navigation'
import Footer from '@/components/atoms/footer'
import { UserMenu } from '@/components/organisms/user-menu'
import { SignButton } from './_components/sign-button'
import { findOrganizationMembership } from '@/adapters/data-access/organization-membership'

export interface DesignSystemLayoutProps extends PropsWithChildren {
  params: any
}

export default async function DesignSystemLayout({
  children,
  params,
}: DesignSystemLayoutProps) {
  const designSystem = await findDesignSystemAndOrganizationBySlug(
    params.designSystemSlug
  )

  if (!designSystem) {
    notFound()
  }

  const { userId } = auth()

  const hasSettings =
    userId &&
    (
      await findOrganizationMembership(
        userId,
        designSystem.organizationId ?? ''
      )
    )?.role === 'owner'

  return (
    <div className="relative min-h-screen flex flex-col scroll-smooth">
      <Header>
        <div className="w-full flex justify-between items-center px-10">
          <div className="flex items-center gap-10">
            <a href={`/${designSystem.slug}`}>
              <h1 className="text-lg font-bold">{designSystem.name}</h1>
            </a>
            <Navigation
              designSystemSlug={params.designSystemSlug}
              hasSettings={hasSettings || false}
            />
          </div>
          <div className="flex items-center gap-10">
            {!userId && <SignButton />}
            {/* <NotificationCenter /> */}
            <UserMenu />
          </div>
        </div>
      </Header>
      <main className="flex-1">{children}</main>
      <Footer className="px-10" />
    </div>
  )
}
