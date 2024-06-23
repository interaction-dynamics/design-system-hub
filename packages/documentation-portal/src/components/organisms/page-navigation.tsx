import { Fragment } from 'react'

interface Link {
  name: string
  slug: string
  links?: Link[]
}

interface Props {
  links: Link[]
}

function RecursiveNavigation({ links }: Props) {
  return (
    <>
      {links.map((link) => (
        <Fragment key={link.slug}>
          <li className="mt-0 pt-2">
            <a
              href={`#${link.slug}`}
              className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
            >
              {link.name}
            </a>
          </li>
          {link.links && (
            <li>
              <ul className="m-0 list-none pl-4">
                <RecursiveNavigation links={link.links} />
              </ul>
            </li>
          )}
        </Fragment>
      ))}
    </>
  )
}

export function PageNavigation({ links }: Props) {
  return (
    <div>
      <p className="font-medium text-primary">On This Page</p>
      <ul className="m-0 list-none text-muted">
        <RecursiveNavigation links={links} />
      </ul>
    </div>
  )
}
