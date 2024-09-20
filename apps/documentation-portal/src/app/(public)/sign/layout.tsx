import { PropsWithChildren } from 'react'
import { currentUser } from '@clerk/nextjs/server'

import Header from '@/components/atoms/header'
import Footer from '@/components/atoms/footer'

export default async function SignLayout({ children }: PropsWithChildren) {
  const user = await currentUser()

  return (
    <div className="relative min-h-screen flex flex-col scroll-smooth">
      <Header>
        <div className="w-full">
          <div className="max-w-6xl px-5 m-auto text-left flex items-center justify-between">
            <h1 className="text-lg font-bold">DesignSystemHub</h1>
          </div>
        </div>
      </Header>
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
      <Footer className="max-w-6xl mx-auto p-5" />
    </div>
  )
}
