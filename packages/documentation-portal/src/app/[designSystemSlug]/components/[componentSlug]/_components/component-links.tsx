import { badgeVariants } from '@/components/ui/badge'
import Link from 'next/link'
import { Component } from '@/domain/entities/component'
import { ComponentVariant } from '@/domain/entities/component-variant'
import { getLinks } from '@/domain/use-cases/ui-merge-component'
import { getProvider } from '@/adapters/providers'

export interface ComponentLinksProps {
  component: Component | ComponentVariant
}

export default function ComponentLinks({ component }: ComponentLinksProps) {
  const links = getLinks({ component, getProvider })

  return (
    <div className="flex gap-2">
      {links.map((link, index) => (
        <Link
          key={link.label}
          className={badgeVariants({ variant: 'secondary' })}
          href={link.href}
          target="_blank"
        >
          {link.label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </Link>
      ))}
    </div>
  )
}
