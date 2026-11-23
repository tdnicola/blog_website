import type { Metadata } from 'next'
import Link from 'next/link'
import { Orbitron } from 'next/font/google'
import SmartLink from '@/components/SmartLink'
import StatusLine from '@/components/StatusLine'
import IssJourney from '@/components/IssJourney'
import siteMetadata from '@/data/siteMetadata.json'

const displayFont = Orbitron({
  subsets: ['latin'],
  weight: '600',
  display: 'swap',
})

const linkStyle = {
  color: 'var(--orange-text)',
  textDecoration: 'underline',
  textUnderlineOffset: 3,
}

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteMetadata.author,
  url: siteMetadata.siteUrl,
  jobTitle: siteMetadata.title,
  worksFor: {
    '@type': 'Organization',
    name: 'Palomar',
    url: 'https://plmr.com/',
  },
  sameAs: [siteMetadata.github, siteMetadata.linkedin],
}

export default function Home() {
  return (
    <main className="home-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <StatusLine />

      <div className="home-hero">
        <h1 className={`${displayFont.className} home-name`}>
          Tony
          <br />
          Nicola
        </h1>

        <IssJourney />
      </div>

      <section className="home-bio" aria-labelledby="about-label">
        <div id="about-label" className="home-section-label">
          <span aria-hidden="true" />
          About
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--body)', marginBottom: 20 }}>
          Data engineer at{' '}
          <SmartLink href="https://plmr.com/" style={linkStyle}>
            Palomar
          </SmartLink>
          , where I build pipelines that move data cleanly from point A to point B - ideally without
          catching fire. I work with SQL, Python, Airflow, Snowflake, and DBT.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--body)' }}>
          Outside the terminal, I&apos;m usually doing{' '}
          <Link href="/blog/JiuJitsuBlackbelt" style={linkStyle}>
            Brazilian Jiu-Jitsu
          </Link>
          , hiking the Pacific Northwest, or making something weird with my 3D printer. I
          occasionally{' '}
          <Link href="/writing" style={linkStyle}>
            ramble in words
          </Link>
          . You can{' '}
          <SmartLink href={`mailto:${siteMetadata.email}`} style={linkStyle}>
            reach me
          </SmartLink>{' '}
          by email, find my code on{' '}
          <SmartLink href={siteMetadata.github} style={linkStyle}>
            github
          </SmartLink>
          , or connect on{' '}
          <SmartLink href={siteMetadata.linkedin} style={linkStyle}>
            linkedin
          </SmartLink>
          .
        </p>
      </section>
    </main>
  )
}
