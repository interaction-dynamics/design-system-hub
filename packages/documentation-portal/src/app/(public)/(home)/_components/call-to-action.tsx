import { currentUser } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'
import { BetaFlag } from './beta-flag'
import { useBetaLink } from '../_utils/use-beta-link'
import Link from 'next/link'

export async function CallToAction() {
  const betaLink = useBetaLink()

  const user = await currentUser()

  return (
    <div className="py-20 text-center p-5 flex justify-center items-center min-h-[70vh]">
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-4xl font-semibold tracking-tight transition-colors first:mt-0">
          Discover a new way to
          <br /> maintain your design system
        </h2>
        <BetaFlag />
        <p className="max-w-md m-auto text-xl leading-7 text-muted-foreground">
          You are one step away from a new way to maintain your design system.
          <br /> Request your beta access now and change the way you manage your
          design system forever.
        </p>
        {user ? (
          <Button size="lg" asChild>
            <Link href="/dashboard">Start Building</Link>
          </Button>
        ) : (
          <Button size="lg" asChild>
            <Link href={betaLink}>Request Access</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
