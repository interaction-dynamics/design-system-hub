import { PropsWithChildren } from 'react'
import Header from '@/components/atoms/header'
import Footer from '@/components/atoms/footer'
import Typography from '@/components/atoms/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { demoLink } from './home/_utils/demo-link'

export default async function DesignSystemLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="relative min-h-screen flex flex-col scroll-smooth">
      <Header>
        <div className="w-full">
          <div className="max-w-5xl m-auto text-left flex items-center justify-between">
            <h1 className="text-lg font-bold">Design Systematik</h1>
            <Button size="sm" asChild>
              <Link href={demoLink}>Try demo</Link>
            </Button>
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
