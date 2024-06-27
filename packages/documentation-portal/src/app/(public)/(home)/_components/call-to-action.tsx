import { Button } from '@/components/ui/button'
import { BetaFlag } from './beta-flag'
import { useBetaLink } from '../_utils/use-beta-link'

export function CallToAction() {
  const betaLink = useBetaLink()

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
        <Button size="lg" asChild>
          <a href={betaLink}>Request Access</a>
        </Button>
      </div>
    </div>
  )
}
