import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import siteMetadata from '@/data/siteMetadata.json'
import '@/css/globals.css'

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.author}`,
  },
  description: siteMetadata.description,
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  icons: {
    icon: '/static/favicons/favicon.ico',
    shortcut: '/static/favicons/favicon-32x32.png',
    apple: '/static/favicons/apple-touch-icon.png',
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.author,
    images: [siteMetadata.openImage],
    locale: siteMetadata.locale,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteMetadata.language} className={plexMono.variable}>
      <body style={{ minHeight: '100vh' }}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
