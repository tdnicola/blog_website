import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSeo } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ children, frontMatter, next, prev }) {
  const { slug, date, title, tags } = frontMatter

  return (
    <SectionContainer>
      <BlogSeo url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <article>
        <div style={{ borderBottom: '1px solid var(--sp-border)', paddingBottom: 1 }}>
          <header style={{ paddingTop: 24, paddingBottom: 24 }}>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <dt className="sr-only">Published on</dt>
                <dd
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    color: 'var(--sp-social)',
                  }}
                >
                  <time dateTime={date}>
                    {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                  </time>
                </dd>
              </div>
              <PageTitle>{title}</PageTitle>
            </div>
          </header>

          <div
            className="xl:grid xl:grid-cols-4 xl:gap-x-6"
            style={{ paddingBottom: 32, gridTemplateRows: 'auto 1fr' }}
          >
            {/* Author sidebar */}
            <dl
              style={{
                paddingTop: 24,
                paddingBottom: 40,
                borderBottom: '1px solid var(--sp-border)',
              }}
              className="xl:border-b xl:pt-11"
            >
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul
                  style={{ listStyle: 'none', padding: 0, margin: 0 }}
                  className="flex justify-center xl:block"
                >
                  <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img
                      src={siteMetadata.image}
                      alt="avatar"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        boxShadow: '0 0 16px rgba(147,197,253,0.2)',
                      }}
                    />
                    <dl>
                      <dt className="sr-only">Name</dt>
                      <dd
                        style={{
                          fontFamily: '"Space Mono", monospace',
                          fontSize: 13,
                          color: 'var(--sp-name)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {siteMetadata.author}
                      </dd>
                    </dl>
                  </li>
                </ul>
              </dd>
            </dl>

            {/* Post content */}
            <div
              className="xl:col-span-3 xl:row-span-2"
              style={{ borderBottom: '1px solid var(--sp-border)' }}
            >
              <div
                className="prose dark:prose-dark max-w-none"
                style={{ paddingTop: 40, paddingBottom: 32 }}
              >
                {children}
              </div>
            </div>

            {/* Tags + prev/next */}
            <footer style={{ paddingTop: 16 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
                className="xl:col-start-1 xl:row-start-2"
              >
                {tags && (
                  <div
                    style={{
                      paddingTop: 16,
                      paddingBottom: 16,
                      borderBottom: '1px solid var(--sp-border)',
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: 9,
                        letterSpacing: '0.22em',
                        color: 'var(--sp-accent-dim)',
                        textTransform: 'uppercase',
                        marginBottom: 8,
                      }}
                    >
                      Tags
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}

                {(next || prev) && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingTop: 16,
                      paddingBottom: 16,
                      gap: 16,
                    }}
                    className="xl:block xl:space-y-8 xl:py-8"
                  >
                    {prev && (
                      <div>
                        <h2
                          style={{
                            fontFamily: '"Space Mono", monospace',
                            fontSize: 9,
                            letterSpacing: '0.22em',
                            color: 'var(--sp-social)',
                            textTransform: 'uppercase',
                            marginBottom: 6,
                          }}
                        >
                          Previous
                        </h2>
                        <Link
                          href={`/blog/${prev.slug}`}
                          style={{
                            fontFamily: '"Space Mono", monospace',
                            fontSize: 12,
                            color: 'var(--sp-accent)',
                            textDecoration: 'none',
                          }}
                        >
                          {prev.title}
                        </Link>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2
                          style={{
                            fontFamily: '"Space Mono", monospace',
                            fontSize: 9,
                            letterSpacing: '0.22em',
                            color: 'var(--sp-social)',
                            textTransform: 'uppercase',
                            marginBottom: 6,
                          }}
                        >
                          Next
                        </h2>
                        <Link
                          href={`/blog/${next.slug}`}
                          style={{
                            fontFamily: '"Space Mono", monospace',
                            fontSize: 12,
                            color: 'var(--sp-accent)',
                            textDecoration: 'none',
                          }}
                        >
                          {next.title}
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div style={{ paddingTop: 16 }}>
                <Link
                  href="/blog"
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: 12,
                    color: 'var(--sp-accent)',
                    textDecoration: 'none',
                    letterSpacing: '0.04em',
                  }}
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
