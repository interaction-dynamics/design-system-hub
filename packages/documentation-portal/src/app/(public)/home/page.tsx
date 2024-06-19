import { CallToAction } from './_components/call-to-action'
import { Features } from './_components/features'
import { Hero } from './_components/hero'
import { MainFeature } from './_components/main-feature'

export default function HomePage() {
  return (
    <>
      <Hero />
      <MainFeature />
      <Features />
      <CallToAction />
    </>
  )
}
