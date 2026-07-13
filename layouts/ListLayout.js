import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'

const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: '"Orbitron", sans-serif',
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--sp-name)',
              marginBottom: 24,
            }}
          >
            {title}
          </h1>
          <div style={{ position: 'relative', maxWidth: 480 }}>
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="search transmissions"
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 44px 10px 16px',
                background: 'var(--sp-surface)',
                border: '1px solid var(--sp-border)',
                borderRadius: 6,
                color: 'var(--sp-body)',
                fontFamily: '"Space Mono", monospace',
                fontSize: 13,
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--sp-accent)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--sp-border)')}
            />
            <svg
              style={{
                position: 'absolute',
                right: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
                color: 'var(--sp-social)',
                pointerEvents: 'none',
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            borderTop: '1px solid var(--sp-border)',
          }}
        >
          {!filteredBlogPosts.length && (
            <li
              style={{
                padding: '32px 0',
                color: 'var(--sp-body)',
                fontFamily: '"Space Mono", monospace',
                fontSize: 13,
              }}
            >
              No transmissions found.
            </li>
          )}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title: postTitle, summary, tags } = frontMatter
            return (
              <li
                key={slug}
                style={{ borderBottom: '1px solid var(--sp-border)', padding: '24px 0' }}
              >
                <article className="xl:grid xl:grid-cols-4 xl:items-baseline" style={{ gap: 24 }}>
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd
                      style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: 11,
                        color: 'var(--sp-social)',
                        letterSpacing: '0.05em',
                        marginBottom: 8,
                      }}
                    >
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                      </time>
                    </dd>
                  </dl>
                  <div
                    className="xl:col-span-3"
                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                  >
                    <h3 style={{ margin: 0 }}>
                      <Link
                        href={`/blog/${slug}`}
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: 'var(--sp-name)',
                          textDecoration: 'none',
                          letterSpacing: '-0.01em',
                          lineHeight: 1.3,
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sp-accent)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--sp-name)')}
                      >
                        {postTitle}
                      </Link>
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                    <p
                      style={{ fontSize: 14, color: 'var(--sp-body)', lineHeight: 1.6, margin: 0 }}
                    >
                      {summary}
                    </p>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
