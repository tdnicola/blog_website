import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { PageSeo } from '@/components/SEO'

export async function getStaticProps() {
  const allPosts = await getAllFilesFrontMatter('blog')
  const posts = allPosts
    .filter((p) => !p.draft)
    .slice(0, 6)
    .map(({ title, slug }) => ({ title, href: `/blog/${slug}` }))
  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />

      {/* HAL 9000 decorative elements — homepage only */}
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
          padding: 'clamp(40px, 6vw, 60px) 0 80px',
        }}
      >
        <h1
          style={{
            fontFamily: '"Orbitron", sans-serif',
            fontSize: 'clamp(18px, 2.5vw, 20px)',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: 'var(--sp-name)',
            textShadow: '0 0 24px var(--sp-glow)',
            marginBottom: 28,
          }}
        >
          Tony Nicola
        </h1>

        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--sp-body)', marginBottom: 16 }}>
          Data engineer at{' '}
          <a
            href="https://www.palomar.com"
            style={{
              color: 'var(--sp-accent)',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Palomar
          </a>
          , where I build pipelines that move data cleanly from point A to point B - ideally without
          catching fire. I work with SQL, Python, Airflow, Snowflake, and DBT.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--sp-body)', marginBottom: 44 }}>
          Outside the terminal, I&apos;m usually doing{' '}
          <a
            href="/blog/JiuJitsuBlackbelt"
            style={{
              color: 'var(--sp-accent)',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Brazilian Jiu-Jitsu
          </a>
          , hiking the Pacific Northwest, or making something weird with my 3D printer.
        </p>

        <p
          aria-hidden="true"
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.15em',
            color: 'var(--sp-divider-clr)',
            marginBottom: 24,
            userSelect: 'none',
          }}
        >
          ---- TRANSMISSION LOG ◉ ----
        </p>

        <p
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.22em',
            color: 'var(--sp-accent-dim)',
            marginBottom: 16,
          }}
        >
          RECENT POSTS
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 52px 0' }}>
          {posts.map(({ title, href }) => (
            <li key={href} style={{ marginBottom: 11 }}>
              <a
                href={href}
                style={{
                  fontSize: 15,
                  color: 'var(--sp-accent)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  minHeight: 44,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sp-name)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--sp-accent)')}
              >
                <span style={{ opacity: 0.5, fontSize: 12 }}>○</span>
                {title}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {[
            { label: 'email', href: `mailto:${siteMetadata.email}` },
            { label: 'github', href: siteMetadata.github },
            { label: 'linkedin', href: siteMetadata.linkedin },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 12,
                letterSpacing: '0.1em',
                color: 'var(--sp-social)',
                textDecoration: 'none',
                padding: '8px 0',
                minHeight: 44,
                display: 'inline-flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sp-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--sp-social)')}
            >
              {label}
            </a>
          ))}
        </div>
      </main>
    </>
  )
}
