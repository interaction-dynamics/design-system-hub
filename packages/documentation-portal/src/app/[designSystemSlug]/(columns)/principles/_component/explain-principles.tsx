import Typography from '@/components/atoms/typography'
import Link from 'next/link'

interface Props {
  designSystemSlug: string
}

export function ExplainPrinciples({ designSystemSlug }: Props) {
  return (
    <div className="">
      <Typography variant="h3">No principles found</Typography>

      <Typography variant="p">
        In order to declare principles you should add markdown files to the
        folder `docs/design-system/guidelines` in your code repository, then you
        can trigger the synchronization process again in the{' '}
        <Link
          className="underline hover:text-foreground"
          href={`/${designSystemSlug}/settings/integrations/code`}
        >
          Code settings
        </Link>
        .
      </Typography>
    </div>
  )
}
