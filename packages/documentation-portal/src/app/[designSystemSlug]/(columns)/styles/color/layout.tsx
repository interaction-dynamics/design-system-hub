import { PropsWithChildren } from 'react'
import { FoundationLayout } from '../_components/foundation-layout'

interface ColorPageProps extends PropsWithChildren {
  params: any
}

export default function Layout(props: ColorPageProps) {
  return <FoundationLayout {...props} slug="color" />
}
