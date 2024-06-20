import { redirect } from 'next/navigation'

interface PageProps {
  params: {
    designSystemSlug: string
  }
}

export default async function RedirectToFirstComponentPage({
  params,
}: PageProps) {
  redirect('principles/color')
}
