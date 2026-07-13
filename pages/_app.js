import '@/css/tailwind.css'

import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'
import Head from 'next/head'

import { SEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'
import { Analytics } from '@vercel/analytics/react'
import { STAR_CSS } from '@/lib/stars'

import mailgo from 'mailgo'

const mailgoConfig = {
  dark: true,
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    mailgo(mailgoConfig)
  }, [])

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <style dangerouslySetInnerHTML={{ __html: STAR_CSS }} />
        </Head>
        <DefaultSeo {...SEO} />
        {Component.noLayout ? (
          <Component {...pageProps} />
        ) : (
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        )}
      </ThemeProvider>
      <Analytics />
    </>
  )
}
