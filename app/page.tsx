import Link from 'next/link'
import SmartLink from '@/components/SmartLink'
import { getAllPosts } from '@/lib/posts'
import siteMetadata from '@/data/siteMetadata.json'

const FEATURED_SLUGS = ['JiuJitsuBlackbelt', 'discordData', 'CareerFoundry']

export default function Home() {
  const posts = getAllPosts()
  const featuredPosts = FEATURED_SLUGS.map((slug) =>
    posts.find((post) => post.slug === slug)
  ).filter((post): post is (typeof posts)[number] => post !== undefined)

  return (
    <>
      {/* HAL 9000 decorative elements - homepage only */}
      <div aria-hidden="true" className="sp-odyssey-hal" />
      <div aria-hidden="true" className="sp-odyssey-monolith" />
      <div aria-hidden="true" className="sp-odyssey-telemetry">
        DISCOVERY I &middot; HAL 9000 UNIT &middot; SYS: NOMINAL
        <br />
        CREW: BOWMAN / POOLE &middot; DEST: JUPITER &middot; MET +&infin;
      </div>

      <main
        style={{
          maxWidth: 560,
          margin: '0 auto',
          padding: 'clamp(40px, 6vw, 60px) 20px 80px',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-orbitron), sans-serif',
            fontSize: 'clamp(24px, 3.5vw, 30px)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: 'var(--sp-name)',
            textShadow: '0 0 28px var(--sp-glow)',
            marginBottom: 28,
          }}
        >
          Tony Nicola
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.75, color: 'var(--sp-body)', marginBottom: 18 }}>
          Data engineer at{' '}
          <a
            href="https://plmr.com/"
            style={{
              color: 'var(--sp-accent)',
              fontWeight: 600,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Palomar
          </a>
          , where I build pipelines that move data cleanly from point A to point B - ideally without
          catching fire. I work with SQL, Python, Airflow, Snowflake, and DBT.
        </p>
        <p style={{ fontSize: 19, lineHeight: 1.75, color: 'var(--sp-body)', marginBottom: 46 }}>
          Outside the terminal, I&apos;m usually doing{' '}
          <Link
            href="/blog/JiuJitsuBlackbelt"
            style={{
              color: 'var(--sp-accent)',
              fontWeight: 600,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Brazilian Jiu-Jitsu
          </Link>
          , hiking the Pacific Northwest, or making something weird with my 3D printer.
        </p>

        <p
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 10,
            letterSpacing: '0.15em',
            color: 'var(--sp-divider-clr)',
            marginBottom: 24,
            userSelect: 'none',
          }}
        >
          ---- TRANSMISSION LOG &#9673; ----
        </p>

        <p
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.22em',
            color: 'var(--sp-accent-dim)',
            marginBottom: 16,
          }}
        >
          WRITING
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0' }}>
          {featuredPosts.map(({ title, slug }) => (
            <li key={slug} style={{ marginBottom: 11 }}>
              <Link
                href={`/blog/${slug}`}
                className="home-post-link"
                style={{
                  fontSize: 16.5,
                  fontWeight: 500,
                  color: 'var(--sp-accent)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  minHeight: 44,
                }}
              >
                <span style={{ opacity: 0.5, fontSize: 12 }}>&#9675;</span>
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/writing"
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 12,
            letterSpacing: '0.05em',
            color: 'var(--sp-social)',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: 52,
          }}
        >
          more writing &rarr;
        </Link>

        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {[
            { label: 'email', href: `mailto:${siteMetadata.email}` },
            { label: 'github', href: siteMetadata.github },
            { label: 'linkedin', href: siteMetadata.linkedin },
          ].map(({ label, href }) => (
            <SmartLink
              key={label}
              href={href}
              className="home-social-link"
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: 12,
                letterSpacing: '0.1em',
                color: 'var(--sp-social)',
                textDecoration: 'none',
                padding: '8px 0',
                minHeight: 44,
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {label}
            </SmartLink>
          ))}
        </div>
      </main>
    </>
  )
}
