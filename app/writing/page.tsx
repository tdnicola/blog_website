import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata = {
  title: 'Writing',
  alternates: {
    canonical: '/writing',
  },
}

export default function Writing() {
  const posts = getAllPosts()

  const postsByYear = new Map<string, typeof posts>()
  for (const post of posts) {
    const year = new Date(post.date).getFullYear().toString()
    const yearPosts = postsByYear.get(year) ?? []
    yearPosts.push(post)
    postsByYear.set(year, yearPosts)
  }

  return (
    <main
      style={{
        maxWidth: 560,
        margin: '0 auto',
        padding: 'clamp(40px, 6vw, 60px) 20px 80px',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 11,
          letterSpacing: '0.1em',
          color: 'var(--orange-text)',
          textDecoration: 'underline',
          textUnderlineOffset: 3,
          textTransform: 'uppercase',
        }}
      >
        &larr; Tony Nicola
      </Link>

      <h1
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 'clamp(24px, 3.5vw, 30px)',
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: 'var(--ink)',
          textTransform: 'uppercase',
          margin: '20px 0 40px',
        }}
      >
        Writing
      </h1>

      {Array.from(postsByYear.entries()).map(([year, yearPosts]) => (
        <div key={year} style={{ marginBottom: 28 }}>
          <p
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 12,
              color: 'var(--muted)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            {year}
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              borderTop: '1px dashed var(--divider)',
            }}
          >
            {yearPosts.map(({ title, slug }) => (
              <li
                key={slug}
                style={{
                  borderBottom: '1px dashed var(--divider)',
                }}
              >
                <Link
                  href={`/blog/${slug}`}
                  className="home-post-link"
                  style={{
                    fontSize: 16.5,
                    fontWeight: 500,
                    color: 'var(--orange-text)',
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: 44,
                  }}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  )
}
