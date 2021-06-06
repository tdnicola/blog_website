import 'nextra-theme-blog/style.css'
import Head from 'next/head'
import mailgo from 'mailgo'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import * as ga from '../lib/index'

import '../styles/main.css'

const mailGoConfig = {
  dark: true,
}

export default function Nextra({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    mailgo(mailGoConfig)
    
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
        {/* <ThemeProvider attribute="class"> */}
          <Component {...pageProps} />
        {/* </ThemeProvider> */}
    </>
  )
}
