import { currentUser } from '@clerk/nextjs/server'

import { SignUpButton, SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Typography from '@/components/atoms/typography'
import { redirect } from 'next/navigation'

export default async function SignLayout() {
  const user = await currentUser()

  if (user) redirect('/dashboard')

  return (
    <div className="flex flex-col items-stretch text-center gap-5 max-w-xs">
      <Typography variant="h1">Private Beta</Typography>
      <Typography variant="p">
        Notice that only people who receive an access can sign up.
      </Typography>
      <Button size="lg" variant="default">
        <SignInButton>Sign in</SignInButton>
      </Button>
      <Button size="lg" variant="default">
        <SignUpButton>Sign Up</SignUpButton>
      </Button>
    </div>
  )
}
