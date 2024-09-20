import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ClerkProvider } from '@clerk/nextjs'

import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'

import './globals.css'
import ThemeProvider from '@/components/organisms/theme-provider'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  metadataBase: new URL('https://design-system-hub.vercel.app'),
  title: 'DesignSystemHub',
  description: 'The hub for your design system documentation',
  openGraph: {
    title: 'DesignSystemHub',
    description: 'The hub for your design system documentation',
    images: [{ url: '/screenshot.png' }],
    siteName: 'DesignSystemHub',
    url: 'https://design-system-hub.vercel.app',
  },
  twitter: {
    title: 'DesignSystemHub',
    description: 'The hub for your design system documentation',
    card: 'summary_large_image',
    images: [{ url: '/screenshot.png' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/new"
    >
      <html
        lang="en"
        className={cn(GeistSans.variable, GeistMono.variable)}
        suppressHydrationWarning
      >
        <body className="min-h-screen scroll-smooth">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
        {process.env.NODE_ENV !== 'development' && (
          <>
            <GoogleAnalytics gaId={process.env.GOOGLE_TAG_ID ?? ''} />
            <Script id="hotjar">
              {`(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${process.env.HOTJAR_ID ?? ''},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
            </Script>
          </>
        )}
      </html>
    </ClerkProvider>
  )
}
