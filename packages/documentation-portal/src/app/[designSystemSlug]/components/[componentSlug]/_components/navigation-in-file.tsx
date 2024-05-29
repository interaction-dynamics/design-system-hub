import { Component } from '@/domain/entities/component'

interface Props {
  component: Component
}

export function NavigationInFile({ component }: Props) {
  return (
    <div>
      {component.variants.length > 0 && (
        <p className="font-medium text-primary">On This Page</p>
      )}
      <ul className="m-0 list-none text-muted">
        {component.variants.length > 0 && (
          <>
            <li className="mt-0 pt-2">
              <a
                href="#variants"
                className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
              >
                Variants
              </a>
            </li>
            <li>
              <ul className="m-0 list-none pl-4">
                {component.variants.map((variant) => (
                  <li key={variant.slug} className="mt-0 pt-2">
                    <a
                      href={`#${variant.slug}`}
                      className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
                    >
                      {variant.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}
