import { redirect } from 'next/navigation'

interface DesignSystemPageProps {
  params: {
    designSystemSlug: string
  }
}

export default function DesignSystemPage({ params }: DesignSystemPageProps) {
  redirect(`/${params.designSystemSlug}/components`)

  return <div>Hello</div>
}
