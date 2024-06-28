import { BorderBeam } from '@/components/magicui/border-beam'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function OpenSource() {
  return (
    <div className="py-20 text-center p-5 flex justify-center items-center min-h-[70vh]">
      <div className="max-w-7xl py-20 m-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-5">
          <h2 className="text-4xl font-semibold tracking-tight transition-colors first:mt-0">
            Open-source under
            <br /> steroids
          </h2>
          <p className="max-w-md text-xl leading-7 text-muted-foreground">
            The project is open-source and built in public. It means you know at
            any time what are the next incoming features. You can also suggest
            or reprioritize features that matters for your business.
          </p>

          <div className="flex items-center gap-4">
            <Button size="lg" asChild>
              <a href={process.env.ROADMAP_URL} target="_blank">
                Check Roadmap
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={process.env.NEW_FEATURE_URL} target="_blank">
                Ask for a feature
              </a>
            </Button>
          </div>
        </div>
        <div className="">
          <div className="relative rounded-xl border shadow-[0_-10px_60px_-15px_rgba(0,0,0,0.6)] dark:shadow-[0_-10px_60px_-15px_rgba(255,255,255,0.3)] overflow-hidden">
            <BorderBeam borderWidth={2} />
            <Image
              src="/roadmap-screenshot.png"
              className="rounded"
              width={730 / 1.5}
              height={466 / 1.5}
              alt="Roadmap"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
