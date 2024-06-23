import { PropsWithChildren } from 'react'
import { FoundationLayout } from '../_components/foundation-layout'

interface SpacingLayoutProps extends PropsWithChildren {
  params: any
}

export default function Layout(props: SpacingLayoutProps) {
  return <FoundationLayout {...props} slug="spacing" />
}
