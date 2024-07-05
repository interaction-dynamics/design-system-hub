import { auth } from '@clerk/nextjs/server'
import { TeamSwitcher } from './team-switcher'
import { redirect } from 'next/navigation'
import { findAllOrganizationsByUserId } from '@/adapters/data-access/organizations'

interface TeamSwitcherServerProps {
  organizationSlug: string
}

export async function TeamSwitcherServer({
  organizationSlug,
}: TeamSwitcherServerProps) {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
    return
  }

  const organizations = await findAllOrganizationsByUserId(userId)

  return (
    <TeamSwitcher
      organizations={organizations}
      organizationSlug={organizationSlug}
    />
  )
}
