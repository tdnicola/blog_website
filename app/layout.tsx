import type { Metadata } from 'next'
import { Orbitron, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import SpaceBackground from '@/components/SpaceBackground'
import { STAR_CSS } from '@/lib/stars'
import siteMetadata from '@/data/siteMetadata.json'
import '@/css/globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-orbitron',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
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
    <html lang={siteMetadata.language} className={`${orbitron.variable} ${spaceMono.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: STAR_CSS }} />
      </head>
      <body className="font-sans" style={{ minHeight: '100vh' }}>
        <SpaceBackground />
        <div style={{ position: 'relative', zIndex: 3 }}>{children}</div>
        <Analytics />
      </body>
    </html>
  )
}
