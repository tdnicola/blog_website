import Link from 'next/link'
import SmartLink from '@/components/SmartLink'
import StatusLine from '@/components/StatusLine'
import OrbitalDial from '@/components/OrbitalDial'
import siteMetadata from '@/data/siteMetadata.json'

const linkStyle = {
  color: 'var(--orange-text)',
  textDecoration: 'underline',
  textUnderlineOffset: 3,
}

export default function Home() {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: 'clamp(40px, 6vw, 60px) 20px 80px',
      }}
    >
      <StatusLine />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 24,
          margin: '32px 0 56px',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 'clamp(48px, 10vw, 108px)',
            fontWeight: 600,
            letterSpacing: '0.02em',
            lineHeight: 1,
            color: 'var(--ink)',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Tony
          <br />
          Nicola
        </h1>

        <OrbitalDial />
      </div>

      <div style={{ maxWidth: 560 }}>
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
            write
          </Link>
          . You can{' '}
          <SmartLink href={`mailto:${siteMetadata.email}`} style={linkStyle}>
            reach me
          </SmartLink>{' '}
          by email, or find my code on{' '}
          <SmartLink href={siteMetadata.github} style={linkStyle}>
            github
          </SmartLink>
          .
        </p>
      </div>
    </main>
  )
}
