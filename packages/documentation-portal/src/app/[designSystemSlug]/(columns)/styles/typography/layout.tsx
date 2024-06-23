import { PropsWithChildren } from 'react'
import { FoundationLayout } from '../_components/foundation-layout'

interface TypogragraphyLayoutProps extends PropsWithChildren {
  params: any
}

export default function Layout(props: TypogragraphyLayoutProps) {
  return <FoundationLayout {...props} slug="typography" />
}
