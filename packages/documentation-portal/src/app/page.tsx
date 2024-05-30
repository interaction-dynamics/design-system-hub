import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/example-design-system---with-variants')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Please add a design system slug in the url
    </main>
  )
}
