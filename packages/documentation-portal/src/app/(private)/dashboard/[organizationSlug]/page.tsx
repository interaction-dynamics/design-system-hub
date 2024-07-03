import { DesignSystemList } from './_components/design-system-list'
import { TeamSwitcher } from './_components/team-switcher'

export default function DashboardPage() {
  return (
    <div className="container py-10">
      <div>
        <TeamSwitcher />
        <div className="pt-4" />
        <DesignSystemList />
      </div>
    </div>
  )
}
