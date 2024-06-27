import { PropsWithChildren } from 'react'
import Header from '@/components/atoms/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { demoLink } from './(home)/_utils/demo-link'
import Footer from '@/components/atoms/footer'

export default async function DesignSystemLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="relative min-h-screen flex flex-col scroll-smooth">
      <Header>
        <div className="w-full">
          <div className="max-w-6xl px-5 m-auto text-left flex items-center justify-between">
            <h1 className="text-lg font-bold">DesignSystemHub</h1>
            <Button size="sm" asChild>
              <Link href={demoLink}>Try demo</Link>
            </Button>
          </div>
        </div>
      </Header>
      <main className="flex-1">{children}</main>
      <Footer className="max-w-6xl mx-auto p-5" />
    </div>
  )
}
