import { SkipButton } from '../../_components/skip-button'

export default function SkipFigmaButton({
  organizationSlug,
}: {
  organizationSlug: string
}) {
  return <SkipButton href={`/new/${organizationSlug}/repository/create`} />
}
