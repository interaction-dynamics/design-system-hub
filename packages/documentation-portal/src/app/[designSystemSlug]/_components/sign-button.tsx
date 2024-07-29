import { SignUpButton } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

export function SignButton() {
  return (
    <SignUpButton>
      <Button>Create your Design System</Button>
    </SignUpButton>
  )
}
