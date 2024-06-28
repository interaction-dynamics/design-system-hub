import { PropsWithChildren } from 'react'
import Header from '@/components/atoms/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Footer from '@/components/atoms/footer'
import { UserMenu } from '@/components/organisms/user-menu'

export default async function DesignSystemLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="relative min-h-screen flex flex-col scroll-smooth">
      <Header>
        <div className="w-full flex justify-between items-center px-10">
          <h1 className="text-lg font-bold">DesignSystemHub</h1>
          <UserMenu />
        </div>
      </Header>
      <main className="flex-1">{children}</main>
      <Footer className="px-10" />
    </div>
  )
}
