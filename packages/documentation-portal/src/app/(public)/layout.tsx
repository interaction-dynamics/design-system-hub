import { PropsWithChildren } from 'react'
import Header from '@/components/atoms/header'
import Footer from '@/components/atoms/footer'
import Typography from '@/components/atoms/typography'

export default async function DesignSystemLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="relative min-h-screen flex flex-col scroll-smooth">
      <Header>fds</Header>
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
