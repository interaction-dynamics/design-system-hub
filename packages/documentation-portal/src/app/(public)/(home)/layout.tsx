import { PropsWithChildren } from 'react'
import { currentUser } from '@clerk/nextjs/server'

import { SignUpButton, SignInButton } from '@clerk/nextjs'
import Header from '@/components/atoms/header'
import { Button } from '@/components/ui/button'
import Footer from '@/components/atoms/footer'
import Link from 'next/link'
import { UserMenu } from '@/components/organisms/user-menu'

export default async function DesignSystemLayout({
  children,
}: PropsWithChildren) {
  const user = await currentUser()

  return (
    <div className="relative min-h-screen flex flex-col scroll-smooth">
      <Header>
        <div className="w-full">
          <div className="max-w-6xl px-5 m-auto text-left flex items-center justify-between">
            <h1 className="text-lg font-bold">DesignSystemHub</h1>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Button size="sm" asChild>
                    <Link href="/dashboard">Go to your design systems</Link>
                  </Button>
                  <UserMenu />
                </>
              ) : (
                <>
                  <Button size="sm" variant="outline">
                    <SignInButton fallbackRedirectUrl="/dashboard">
                      Sign in
                    </SignInButton>
                  </Button>
                  <Button size="sm" asChild>
                    <SignUpButton>Get started</SignUpButton>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Header>
      <main className="flex-1">{children}</main>
      <Footer className="max-w-6xl mx-auto p-5" />
    </div>
  )
}
