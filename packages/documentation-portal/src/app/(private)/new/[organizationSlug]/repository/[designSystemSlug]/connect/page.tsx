import { redirect } from 'next/navigation'

interface Props {
  params: { designSystemSlug: string; organizationSlug: string }
}

export default function NewDesignSystemFigmaPage({ params }: Props) {
  redirect('connect/manual')
}
