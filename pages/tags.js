import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'

export async function getStaticProps() {
  const tags = await getAllTags('blog')
  return { props: { tags } }
}

export default function Tags({ tags }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSeo
        title={`Tags - ${siteMetadata.author}`}
        description="Things I blog about"
        url={`${siteMetadata.siteUrl}/tags`}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingTop: 48,
          paddingBottom: 80,
        }}
        className="md:flex-row md:items-center md:space-x-6"
      >
        <div style={{ marginBottom: 32 }} className="md:mb-0">
          <h1
            style={{
              fontFamily: '"Orbitron", sans-serif',
              fontSize: 'clamp(24px, 4vw, 48px)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--sp-name)',
              paddingRight: 24,
              borderRight: '2px solid var(--sp-border)',
            }}
            className="md:px-6"
          >
            Tags
          </h1>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 560, gap: 8 }}>
          {Object.keys(tags).length === 0 && (
            <p
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 13,
                color: 'var(--sp-body)',
              }}
            >
              No tags found.
            </p>
          )}
          {sortedTags.map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Tag text={t} />
              <Link
                href={`/tags/${kebabCase(t)}`}
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: 11,
                  color: 'var(--sp-social)',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                }}
              >
                ({tags[t]})
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
