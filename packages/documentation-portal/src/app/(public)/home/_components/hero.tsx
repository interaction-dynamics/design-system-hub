import { BorderBeam } from '@/components/magicui/border-beam.tsx'
import Image from 'next/image'

export function Hero() {
  return (
    <div className="py-10">
      <div className="max-w-2xl m-auto p-1 py-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Design System Manager
        </h1>
        <p className="text-xl leading-7 [&:not(:first-child)]:mt-2 text-muted-foreground">
          Document and maintain your design system without a sweat.
        </p>
      </div>
      <div className="max-w-6xl m-auto p-1 py-10 ">
        <div className="relative rounded-xl shadow-[0_-10px_60px_-15px_rgba(255,255,255,0.3)] overflow-hidden">
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
