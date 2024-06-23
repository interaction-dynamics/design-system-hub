import { PropsWithChildren } from 'react'
import { FoundationLayout } from '../_components/foundation-layout'

interface ElevationLayoutProps extends PropsWithChildren {
  params: any
}

export default function Layout(props: ElevationLayoutProps) {
  return <FoundationLayout {...props} slug="elevation" />
}
