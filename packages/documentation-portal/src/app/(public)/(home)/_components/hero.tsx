import { BorderBeam } from '@/components/magicui/border-beam'
import { Button } from '@/components/ui/button'

import Image from 'next/image'
import { BetaFlag } from './beta-flag'
import Link from 'next/link'
import { demoLink } from '../_utils/demo-link'

export function Hero() {
  return (
    <div className="pt-20 flex flex-col items-start gap-10">
      <div className="max-w-4xl m-auto p-5 flex flex-col items-start gap-4">
        <h1 className="text-4xl sm:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-500 py-5">
          Synchronize your design system accross your organization
        </h1>
        <div>
          <BetaFlag />
        </div>
        <p className="text-xl leading-7 text-muted-foreground max-w-lg">
          A zero-config, single source of truth for your design system to
          deliver features faster.
        </p>
        <div className="flex items-center gap-4">
          <Button size="lg" asChild>
            <Link href={demoLink}>Try demo</Link>
          </Button>
          <Button size="lg" variant="outline">
            Request Access
          </Button>
        </div>
      </div>
      <div className="max-w-6xl m-auto p-5 ">
        <div className="relative rounded-xl border shadow-[0_-10px_60px_-15px_rgba(255,255,255,0.3)] overflow-hidden">
          <BorderBeam borderWidth={2} />
          <Image
            src="/screenshot.png"
            alt="Screenshot"
            width={2799 * 0.5}
            height={1980 * 0.5}
          />
        </div>
      </div>
    </div>
  )
}
