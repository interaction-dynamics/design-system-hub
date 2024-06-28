import { PropsWithChildren } from 'react'
import { Separator } from '../ui/separator'
import { cn } from '@/lib/utils'
import Typography from './typography'
import { productName } from '@/config/names'
import { ThemeSwitcher } from '../organisms/theme-switcher'

interface FooterProps extends PropsWithChildren {
  className?: string
}

const socials = [
  {
    href: 'https://github.com/interaction-dynamics/design-system-manager',
    icon: (
      <svg
        height="18"
        width="18"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        aria-label="github"
      >
        <g clipPath="url(#clip0_872_3147)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z"
            fill="currentColor"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_872_3147">
            <rect width="16" height="16" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/thibault-friedrich/',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="linkedin"
      >
        <path
          fill="currentColor"
          d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
        ></path>
      </svg>
    ),
  },
  {
    href: 'https://x.com/R_Thibault_Oliw',
    icon: (
      <svg
        height="18"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width="18"
        aria-label="x.com"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    href: 'https://blog.interaction-dynamics.io/',
    icon: (
      <svg
        height="18"
        width="18"
        viewBox="0 -55 256 256"
        preserveAspectRatio="xMidYMid"
        aria-label="medium"
      >
        <path
          d="M72.2009141,1.42108547e-14 C112.076502,1.42108547e-14 144.399375,32.5485469 144.399375,72.6964154 C144.399375,112.844284 112.074049,145.390378 72.2009141,145.390378 C32.327779,145.390378 0,112.844284 0,72.6964154 C0,32.5485469 32.325326,1.42108547e-14 72.2009141,1.42108547e-14 Z M187.500628,4.25836743 C207.438422,4.25836743 223.601085,34.8960455 223.601085,72.6964154 L223.603538,72.6964154 C223.603538,110.486973 207.440875,141.134463 187.503081,141.134463 C167.565287,141.134463 151.402624,110.486973 151.402624,72.6964154 C151.402624,34.9058574 167.562834,4.25836743 187.500628,4.25836743 Z M243.303393,11.3867175 C250.314,11.3867175 256,38.835526 256,72.6964154 C256,106.547493 250.316453,134.006113 243.303393,134.006113 C236.290333,134.006113 230.609239,106.554852 230.609239,72.6964154 C230.609239,38.837979 236.292786,11.3867175 243.303393,11.3867175 Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
]

export default function Footer({ children, className }: FooterProps) {
  return (
    <footer className="">
      <Separator className="w-full" />
      <div className={cn('container py-10 ', className)}>
        <div className="min-h-32 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="inline-block p-2 text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <Typography variant="p">
            Powered by{' '}
            <a
              href="https://github.com/interaction-dynamics/design-system-manager"
              className="underline hover:text-primary"
            >
              {productName}
            </a>
          </Typography>
          <ThemeSwitcher />
        </div>
        {children}
      </div>
    </footer>
  )
}
